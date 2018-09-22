const TagModel = new NGN.DATA.Model({
  fields: {
    label: String,
    decription: String,
    type: String,
    rawJson: String
  },

  virtuals: {
    name: function () {
      return this.label
    }
  },

  relationships: {
    start: CodePositionModel
  }
})
