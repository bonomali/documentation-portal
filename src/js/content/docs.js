import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'
import Content from '../view/content.js'

const Docs = new ViewRegistry({
  parent: Content,
  selector: '> .docs',
  namespace: 'docs.',

  events: {
    populate (product) {
      console.log('docs');
      console.log(product);
      // Docs.render(Docs.self, [
      //   Docs.createElement('h2', {}, [`${CurrentProduct.title} Documentation`]),
      //   Docs.createElement('div', {
      //     class: 'manifest'
      //   }, [JSON.stringify(CurrentProduct.manifest)])
      // ])
      // .then(result => Workspace.ref.content.element.show(1))
      // .catch(err => console.error(err))
    },
  }
})

export default Docs
