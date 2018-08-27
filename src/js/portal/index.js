// NGNX.Loader({
//   sync: [
//     '../js/portal/registries/main.js'
//   ]
// })
//
// NGN.DOM.ready(() => {
//   NGN.DOM.svg.update()
// })

NGN.BUS.on('some.event', () => { console.log('fired') }, 20000)
setInterval(() => NGN.BUS.emit('some.event'), 5000)
