const fs = require('fs-extra')
const path = require('path')

const ProductionLine = require('productionline-web')

const Postcss = require('postcss')
const Chassis = require('@chassis/core')

const TaskRunner = require('shortbus')
const CleanCss = require('clean-css')

class CustomProductionLine extends ProductionLine {
  constructor (cfg) {
    super(cfg)

    this.paths = {
      javascript: path.join(this.SOURCE, '/**/*.js'),
      css: path.join(this.SOURCE, '/**/*.css')
    }
  }

  processCss (minify = true, cb) {
    let tasks = new TaskRunner()

    let chassis = new Chassis({
      importBasePath: path.resolve(`${this.SOURCE}/css`),
      theme: path.resolve(`${this.SOURCE}/css/main.theme`),

      layout: {
        minWidth: 320
      }
    })

    this.walk(this.paths.css).forEach(filepath => {
      let filename = /[^/]*$/.exec(filepath)[0]

      if (filename.startsWith('_')) {
        return
      }

      tasks.add(`Process ${this.localDirectory(filepath)}`, next => {
        let dir = path.dirname(filepath)
        let css = this.readFileSync(filepath)

        chassis.process(css, (err, css) => {
          if (err) {
            throw err
          }

          let output = {
            path: this.outputDirectory(filepath),
            css
          }

          if (!minify) {
            return this.writeFile(output.path, output.css, next)
          }

          let minified = chassis.minify(output.css, true)

          if (minified.sourceMap) {
            this.writeFileSync(`${output.path}.map`, minified.sourceMap.toString())
          }

          this.writeFile(output.path, minified.styles, next)
        }, filepath)
      })
    })

    tasks.on('complete', cb)
    tasks.run()
  }

  make (devMode = false) {
    this.clean()
    this.copyAssets(true)
    this.buildHTML()
    this.buildJavaScript()
    this.addTask('Build CSS', next => this.processCss(!devMode, next))
  }
}

const builder = new CustomProductionLine({
  header: `Copyright (c) ${new Date().getFullYear()} Ecor Ventures LLC.\nVersion ${this.version} built on ${new Date().toString()}`,

  commands: {
    '--build' (cmd) {
      builder.make()
    },

    '--build-dev' (cmd) {
      builder.make(true)

      builder.watch((action, filepath) => {
        if (action === 'create' || action === 'update') {
          builder.make(true)
          builder.run()
        }
      })
    }
  }
})

builder.assets = path.resolve('./src/assets')
builder.run()
