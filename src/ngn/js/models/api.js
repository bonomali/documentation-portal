const APIModel = new NGN.DATA.Model({
  fields: {
    bus: {
      type: Object,
      default: {}
    },

    classes: {
      type: Object,
      default: {}
    },

    exceptions: {
      type: Object,
      default: {}
    },

    namespaces: {
      type: Object,
      default: {}
    }
  }
})

const API = new APIModel()

NGN.BUS.emit('models.api.loaded')
