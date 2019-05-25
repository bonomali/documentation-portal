export default class CurrentState {
  static get hash () {
    return window.location.hash
  }

  static get hostname () {
    window.location.hostname
  }

  static get host () {
    window.location.host
  }

  static get origin () {
    window.location.origin
  }

  static get path () {
    return window.location.origin + window.location.pathname
  }

  static get pathname () {
    return window.location.pathname
  }

  static get port () {
    return window.location.port
  }

  static get protocol () {
    return window.location.protocol
  }

  static get search () {
    return window.location.search
  }

  static get url () {
    return window.location.href
  }

  // Returns a JavaScript map of URL query parameters (excluding the hash).
  static get queryParameters () {
    let params = new Map()

    window.location.search.substr(1).split('&').forEach(keypair => {
      if (keypair) {
        keypair = keypair.split('=')
        params.set(keypair[0], NGN.coalesce(keypair[1], null))
      }
    })

    return params
  }

  static addParam (key, value = null) {
    window.location = `${this.url.replace(this.hash, '')}${this.queryParameters.size > 0 ? '&' : '?'}${key}${value ? `=${value}` : ''}${this.hash}`
  }

  static clearParams (refresh) {
    window.location = `${this.path}${this.hash}`
  }

  static getParamAsString (name) {
    if (!this.hasParam(name)) {
      return null
    }

    return `${name}${this.paramHasValue(name) ? `=${this.getParamValue(name)}` : ''}`
  }

  static getParamValue (name) {
    return this.queryParameters.get(name)
  }

  static hasParam (name) {
    return this.queryParameters.has(name)
  }

  static paramHasValue (name) {
    let value = this.getParamValue(name)
    return [null, undefined].every(entry => value !== entry)
  }

  static removeParam (name) {
    if (!this.hasParam(name)) {
      return
    }

    let location = this.path
    let index = 0

    this.queryParameters.forEach((value, key) => {
      if (key === name) {
        return
      }

      location += `${index === 0 ? '?' : '&'}${key}${value ? `=${value}` : ''}${this.hash}`
      index++
    })

    window.location = location
  }
}
