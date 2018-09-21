import CodePositionModel from './CodePosition.js'

const TagModel = new NGN.DATA.Model({
  fields: {
    label: String,
    decription: String,
    type: String,
    start: CodePositionModel,
    raw: String,

    name: function () {
      return this.label
    }
  }
})

export default TagModel
