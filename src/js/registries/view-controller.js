import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'

const ViewController = new ViewRegistry({
  selector: '.authorio.docs.portal > main .views',
  namespace: 'views.',

  references: {
    views: '.view'
  },

  events: {
    goto: data => {
      let view = typeof data === 'object' ? data.view : data
      console.log(view);
      ViewController.self.element.show(`.${view}`)
    },

    populate: products => {
      let queue = new NGN.Queue()

      ViewController.render(ViewController.self, products.map(product => {
        return ViewController.createElement('section', {
          class: classNames(product.id, 'view')
        }, [
          ViewController.createElement('h2', {}, [`${product.title} Documentation`])
        ])
      }), true)
      .then(element => ViewController.emit('populated'))
      .catch(err => console.error(err))
    }
  },

  init () {
    this.self.on({
      beforechange: evt => {
        evt.preventDefault()

        let { currentSelection, nextSelection, next } = evt.detail

        this.self.element.setAttribute('transition', '')
        currentSelection.element.setAttribute('fade-out', '')
        setTimeout(() => {
          this.emit('loading')
          next()
        }, 382)
      },

      change: evt => {
        this.emit('loaded')
        let { previousSelection, currentSelection } = evt.detail

        this.self.element.removeAttribute('transition')
        previousSelection.element.removeAttribute('fade-out')
        currentSelection.element.setAttribute('fade-in', '')
        setTimeout(() => {
          currentSelection.element.removeAttribute('fade-in')
        }, 618)
      }
    })
  }
})

export default ViewController
