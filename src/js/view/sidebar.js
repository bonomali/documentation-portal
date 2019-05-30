import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'
import { API } from '../index.js'
import Workspace from './workspace.js'

const Sidebar = new ViewRegistry({
  parent: Workspace,
  selector: '> .sidebar',
  namespace: 'sidebar.',

  properties: {
    selectedSection: {
      type: String,
      default: 'introduction'
    }
  },

  references: {
    drawer: '> author-drawer',
    list: 'nav > .sections'
  },

  states: {
    hidden () {
      this.self.element.classList.add('hidden')
    },

    visible () {
      this.self.element.classList.remove('hidden')
    }
  },

  initialState: 'visible',

  events: {
    populate (tree) {


      // for (let APIURL in product.manifest) {
      //   console.log(APIURL);
      //   API.fetchDocs(product.manifest[APIURL], entities => {
      //     console.log(entities);
      //   })
      // }


      // this.render(this.ref.list, MenuStore.records.map((section, index) => {
      //   let hasChildren = section.children.recordCount > 0
      //   let isSelected = section.key === this.properties.selectedSection
      //
      //   return this.createElement({
      //     tag: 'div',
      //
      //     attributes: {
      //       'class': classNames({
      //         accordion: hasChildren,
      //         selected: isSelected
      //       }, 'section')
      //     },
      //
      //     on: !isSelected ? {
      //       click: evt => this.emit('section.select', index, section.key)
      //     } : null,
      //
      //     children: [
      //       this.createElement('div', {
      //         class: 'header'
      //       }, [
      //         section.label,
      //         hasChildren ? this.createElement({
      //           tag: 'svg',
      //
      //           attributes: {
      //             class: 'icon',
      //             src: 'assets/icons/chevron-down.svg'
      //           }
      //         }) : null
      //       ]),
      //
      //       hasChildren ? this.createElement('ul', {
      //         class: 'children',
      //       }, section.children.records.map(child => this.createElement({
      //         tag: 'li',
      //         children: [child.label],
      //
      //         on: {
      //           click: evt => this.emit('section.select', index, section.key, child.key)
      //         }
      //       }))) : null
      //     ]
      //   })
      // }))
      // .then(target => this.emit('populated'))
      // .catch(error => console.error(error))
    }
  },

  init () {
    this.properties.on('field.update', change => {
      switch (change.field) {
        case 'selectedSection': return this.emit('populate')
      }
    })
  }
})

export default Sidebar
