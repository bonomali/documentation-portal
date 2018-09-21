import SnippetModel from './Snippet.js'

class ExceptionDataModel extends SnippetModel {
  constructor (cfg = {}) {
    cfg.fields = Object.assign(cfg.fields || {}, {
      severity: String,
      message: String,
      category: String,
      tags: Object
    })

    super(cfg)
  }
}

const ExceptionModel = new ExceptionDataModel()

export default ExceptionModel
