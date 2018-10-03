const fs = require('fs-extra')
const path = require('path')

const ProductionLine = require('productionline-web')

const Chassis = require('@chassis/core')

const TaskRunner = require('shortbus')
const CleanCss = require('clean-css')

class CustomProductionLine extends ProductionLine {
  constructor (cfg) {
    super(cfg)

    this.paths = {
      javascript: path.join(this.SOURCE, '/**/*.js'),
      css: path.join(this.SOURCE, '/**/*.css'),
      json: path.join(this.SOURCE, '**/*.json')
    }
  }

  copyJson (cb) {
    this.walk(this.paths.json).forEach(file => {
      this.copyToOutput(file)
    })

    cb && cb()
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

  processJavascript (minify = true, cb) {
    let tasks = new TaskRunner()

    this.walk(this.paths.javascript).forEach(filepath => {
      tasks.add(`Process ${this.localDirectory(filepath)}`, cont => {
        let dir = path.dirname(filepath)
        let isAsset = this.isSubdirectory(dir, path.resolve(`${this.SOURCE}/assets`))

        if (isAsset) {
          return this.copyToOutput(filepath.replace(this.SOURCE, ''), cont)
        }

        let output = this.transpile(filepath)

        if (minify) {
          output = this.minify(output.code)
        }

        this.writeFile(this.outputDirectory(filepath), this.applyHeader(output.code, 'js'), cont)
        // this.writeFile(this.outputDirectory(filepath), output.code, cont)
      })
    })

    tasks.on('complete', cb)
    tasks.run()
  }

  isSubdirectory (child, parent) {
    if (child === parent) {
      return false
    }

    let tokens = {
      parent: parent.split(path.sep).filter(token => token.length),
      child: child.split(path.sep).filter(token => token.length)
    }

    return tokens.parent.every((token, i) => tokens.child[i] === token)
  }

  make (devMode = false) {
    this.clean()
    this.addTask('Copy API Data', next => this.copyJson(next))
    this.copyAssets(true)
    this.buildHTML()
    this.addTask('Build JavaScript', next => this.processJavascript(!devMode, next))
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
