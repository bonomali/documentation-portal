import SnippetModel from './Snippet'

export default class ParameterModel extends SnippetModel {
  constructor (cfg = {}) {
    cfg.fields = Object.asssign(cfg.fields || {}, {
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
