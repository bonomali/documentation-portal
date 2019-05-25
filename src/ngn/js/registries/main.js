const NGN_DOCS = new NGNX.VIEW.Registry({
  selector: '.ngn.docs',
  namespace: 'docs.ngn.',

  testMethod () {
    console.log('test works');
  },

  init () {
    NGN.BUS.emit('TEMP_DEPENDENCY_LOADED', this)

    this.on({
      load: () => {
        console.log('load');

        // let { namespaces } = Product.manifest
        //
        // namespaces.forEach(namespace => {
        //   // Product.resources[ns] = new NGN.NET.Resource({
        //   //   baseUrl: namespaces[ns]
        //   // })
        //
        //   NGN.NET.json(`${API.baseUrl}${namespace}`, (err, data) => {
        //     if (err) {
        //       throw err
        //     }
        //
        //     console.log(data);
        //     // Product.namespaces.load(data)
        //   })
        // })
      }
    })
  }
})
