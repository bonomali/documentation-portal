const ReturnModel = new NGN.DATA.Model({
  fields: {
    type: {
      type: String,
      default: 'void'
    },
    description: {
      type: String,
      default: 'void'
    }
  }
})

export default ReturnModel
