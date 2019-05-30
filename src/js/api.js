export default class APIConstructor {
  constructor ({ baseURL, credentials }) {
    this.baseURL = baseURL
    this.credentials = credentials

    Object.defineProperties(this, {
      jsonRequest: NGN.privateconst((uri, callback) => {
        NGN.NET.json(uri, (err, json) => {
          if (err) {
            throw err
          }

          callback && callback(json)
        })
      })
    })
  }

  fetchProducts (callback) {
    this.jsonRequest(`${this.baseURL}/config/products.json`, callback)
  }

  fetchManifest (url, callback) {
    this.jsonRequest(url, callback)
  }

  fetchDocs (url, callback) {
    this.jsonRequest(url, callback)
  }
}
