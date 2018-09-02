import CodePositionModel from './CodePosition'

const TagModel = new NGN.DATA.Mode({
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


export { TagModel }
