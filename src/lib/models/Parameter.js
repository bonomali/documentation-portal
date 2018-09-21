import SnippetModel from './Snippet.js'

class ParameterDataModel extends SnippetModel {
  constructor (cfg = {}) {
    cfg.fields = Object.assign(cfg.fields || {}, {
      default: String,
      required: {
        type: Boolean,
        default: false
      },
      datatype: String,
      enum: Array
    })

    super(cfg)
  }
}

let ParameterModel = new ParameterDataModel()

export default ParameterModel
