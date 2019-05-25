class VirtualNode {
  constructor ({ tag, attributes, on, component, children }) {
    this.tag = NGN.coalesce(tag)
    this.attributes = NGN.coalesce(attributes)
    this.listeners = NGN.coalesce(on, {})
    this.component = NGN.coalesce(component)
    this.children = NGN.coalesce(children, []).filter(Boolean)
  }

  get hasAttributes () {
    return !!this.attributes && Object.keys(this.attributes).length > 0
  }

  get hasListeners () {
    return !!this.listeners && Object.keys(this.listeners).length > 0
  }

  hasAttribute (attribute) {
    return this.attributes.hasOwnProperty(attribute)
  }

  hasChildren () {
    return this.children.length > 0
  }

  hasListener (listener) {
    return this.listeners.hasOwnProperty(listener)
  }
}

export default class ViewRegistry extends NGNX.VIEW.Registry {
  constructor (cfg) {
    super(cfg)
    this.cachedElements = new WeakMap
  }

  appendChildNodes (target, children) {
    children.forEach(child => target.appendChild(this.createNode(child)))
  }

  clearChildNodes (target) {
    let replacement = target.cloneNode(false)
    target.parentNode.replaceChild(replacement, target);
    return replacement
  }

  // TODO: Handle component creation and management
  createNode (virtual) {
    if (typeof virtual === 'string') {
      return document.createTextNode(virtual)
    }

    let element = document.createElement(virtual.tag)

    for (let attribute in virtual.attributes) {
      element.setAttribute(attribute, virtual.attributes[attribute])
    }

    if (virtual.listeners) {
      for (let listener in virtual.listeners) {
        element.addEventListener(listener, virtual.listeners[listener])
      }
    }

    if (virtual.children) {
      virtual.children.map(child => this.createNode(child)).forEach(child => element.appendChild(child))
    }

    return element
  }

  nodeIsEmpty (target) {
    return [...target.childNodes].every(child => child.nodeType === 3 && !child.data.trim())
  }

  parseElement (element) {
    return new VirtualNode({
      tag: element.localName,

      attributes: [...element.attributes].reduce((result, attribute) => {
        result[attribute.name] = attribute.value
        return result
      }, {}),

      children: element.childNodes.length > 0 ? [...element.childNodes].map(child => {
        switch (child.nodeType) {
          case 1: return this.parseElement(child)
          case 3: return child.data
          default: return null
        }
      }) : []
    })
  }

  addAttributes (node, attributes) {
    for (let attribute in attributes) {
      node.setAttribute(attribute, attributes[attribute])
    }
  }

  removeAttributes (node, attributes) {
    if (attributes) {
      for (let attribute in attributes) {
        node.removeAttribute(attribute)
      }

      return
    }

    while(node.attributes.length > 0) {
      node.removeAttribute(node.attributes[0].name)
    }
  }

  addListeners (node, listeners) {
    for (let listener in listeners) {
      node.addEventListener(listener, listeners[listener])
    }
  }

  removeListeners (node, listeners) {
    for (let listener in listeners) {
      node.removeEventListener(listener, listeners[listener])
    }
  }

  reconcileAttributes (currentNode, state) {
    if (state.new.hasAttributes && !state.old.hasAttributes) {
      return this.addAttributes(currentNode, state.new.attributes)
    }

    if (!state.new.hasAttributes && state.old.hasAttributes) {
      return this.removeAttributes(currentNode, state.old.attributes)
    }

    // TODO: Possibly check if each set of attributes is an identical match,
    // and skip processing if so.

    for (let attribute in Object.assign({}, state.new.attributes, state.old.attributes)) {
      let newNodeHasAttribute = state.new.hasAttribute(attribute)
      let shared = newNodeHasAttribute && state.old.hasAttribute(attribute)
      let match = shared ? state.new.attributes[attribute].trim() === state.old.attributes[attribute].trim() : false

      if (match) {
        continue
      }

      if (shared || newNodeHasAttribute) {
        currentNode.setAttribute(attribute, state.new.attributes[attribute])
        continue
      }

      currentNode.removeAttribute(attribute)
    }
  }

  reconcileListeners (currentNode, state) {
    if (state.new.hasListeners && !state.old.hasListeners) {
      return this.addListeners(currentNode, state.new.listeners)
    }

    if (!state.new.hasListeners && state.old.hasListeners) {
      return this.removeListeners(currentNode, state.old.listeners)
    }

    // TODO: Possibly check if each set of listeners is an identical match,
    // and skip processing if so.

    for (let listener in Object.assign({}, state.new.listeners, state.old.listeners)) {
      let newNodeHasListener = state.new.hasListener(listener)
      let shared = newNodeHasListener && state.old.hasListener(listener)
      let match = shared ? state.new.listeners[listener] === state.old.listeners[listener] : false

      if (match) {
        continue
      }

      if (shared) {
        currentNode.removeEventListener(listener, state.old.listeners[listener])
      }

      if (newNodeHasListener) {
        currentNode.addEventListener(listener, state.new.listeners[listener])
      }
    }
  }

  reconcileNodes ({
    target,
    state = { old: null, new: null },
    index = 0
  }) {
    // If no old node specified, add new node
    if (!state.old) {
      return target.appendChild(this.createNode(state.new))
    }

    let currentNode = target.childNodes[index]

    // If no new node specified, remove old node
    if (!state.new) {
      return currentNode && target.removeChild(currentNode)
    }

    // Compare and reconcile node types
    if (typeof state.new !== typeof state.old) {
      return target.replaceChild(this.createNode(state.new), currentNode)
    }

    if (typeof state.new === 'string') {
      return state.new === state.old ? null : target.replaceChild(this.createNode(state.new), currentNode)
    }

    // Compare and reconcile node tags
    if (state.new.tag !== state.old.tag) {
      return target.replaceChild(this.createNode(state.new), currentNode)
    }

    // Compare and reconcile attributes
    this.reconcileAttributes(currentNode, state)

    // Compare and reconcile event listeners
    this.reconcileListeners(currentNode, state)

    // Compare and reconcile node children
    if (!state.new.hasChildren) {
      return state.old.hasChildren ? this.clearChildNodes(target) : null
    }

    // TODO: Possibly check if each element has identical children, and skip
    // processing if so.

    // If children are present, reconcile them
    for (let i = 0; i < Math.max(state.new.children.length, state.old.children.length); i++) {
      this.reconcileNodes({
        target: currentNode,
        state: {
         old: NGN.coalesce(state.old.children[i]),
         new: NGN.coalesce(state.new.children[i])
        },
        index: i
      })
    }
  }

  renderHTML (target, children, append = false) {
    return new Promise((resolve, reject) => {
      if (!target) {
        return reject('Invalid target element.')
      }

      if (append) {
        children.forEach(child => target.appendChild(this.createNode(child)))
        return resolve(target)
      }

      if (typeof children === 'string' || typeof children === 'number') {
        target.innerHTML = children
        return resolve(target)
      }

      if (children.length === 0) {
        return reject('No child elements were provided for rendering.')
      }

      let cached = this.cachedElements.get(target)

      if (cached.children.length === 0) {
        this.appendChildNodes(target, children)

      } else {
        for (let i = 0; i < Math.max(children.length, cached.children.length); i++) {
          this.reconcileNodes({
            target,

            state: {
              old: NGN.coalesce(cached.children[i]),
              new: NGN.coalesce(children[i])
            },

            index: i
          })
        }
      }

      cached.children = children

      if (NGN.hasOwnProperty('DOM')) {
        NGN.DOM.svg.update()
      }

      resolve(target)
    })
  }

  createElement (...args) {
    if (args.length === 0 || !args[0]) {
      throw new Error('Invalid Configuration.')
    }

    switch (typeof args[0]) {
      case 'string': return new VirtualNode({
        tag: args[0],
        attributes: args[1],
        children: args[2]
      })

      case 'object': return new VirtualNode(args[0])

      default: throw new Error('Invalid Configuration.')
    }
  }

  // TODO: Add try/catch to handle errors from this.createElement
  render (...args) {
    let target
    let children = args[1]

    switch (args[0].constructor) {
      case HTMLReferenceElement:
        target = args[0].element
        break

      case HTMLElement:
        target = args[0]
        break

      default: new Promise((resolve, reject) => reject('Invalid target element!'))
    }

    // If the target element does not have any children, or has only empty
    // text nodes, clear all child nodes to avoid a diff
    if (this.nodeIsEmpty(target) && target.childNodes.length > 0) {
      target = this.clearChildNodes(target)
    }

    // Cache target element for next re-render
    if (!this.cachedElements.has(target)) {
      this.cachedElements.set(target, this.parseElement(target))
    }

    return this.renderHTML(target, children, NGN.coalesce(args[2]) ? true : false)

    // TODO: Handle template rendering
  }
}
