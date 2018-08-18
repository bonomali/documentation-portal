NGNX.Loader({
  sync: [
    '../js/portal/registries/main.js'
  ]
})

NGN.DOM.ready(() => {
  NGN.DOM.svg.update()
})
