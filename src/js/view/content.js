import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'
import Workspace from './workspace.js'

const Content = new ViewRegistry({
  parent: Workspace,
  selector: '> .content',
  namespace: 'content.',

  events: {
    show (view) {
      Content.self.element.show(`.${view}`)
    }
  }
})

export default Content
