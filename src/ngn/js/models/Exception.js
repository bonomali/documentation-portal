class ExceptionModel extends SnippetModel {
  constructor (cffg = {}) {
    cfg.fields = Object.assign(cfg.fields || {}, {
      severity: String,
      message: String,
      category: String,
      tags: Object
    })

    super(cfg)
  }
}
