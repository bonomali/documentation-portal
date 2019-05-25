import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'

const Content = new ViewRegistry({
  selector: '.authorio.docs.portal > main .content',
  namespace: 'content.',

  references: {
    sections: '> *'
  },

  events: {
    show: data => {
      Content.emit('loading')
      let content = typeof data === 'object' ? data.content : data
      Content.self.element.show(`.${content}`)
    },

    populate: products => {
      let queue = new NGN.Queue()

      Content.render(Content.self, products.map(product => {
        return Content.createElement('section', {
          class: classNames(product.id, 'view')
        }, [
          Content.createElement('h2', {}, [`${product.title} Documentation`])
        ])
      }), true)
      .then(element => Content.emit('populated'))
      .catch(err => console.error(err))
    }
  },

  init () {
    this.self.on({
      change: evt => this.emit('loaded')
    })
  }
})

export default Content
