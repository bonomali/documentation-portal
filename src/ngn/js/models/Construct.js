class ConstructModel extends SnippetModel {
  constructor (cfg = {}) {
    cfg.relationships = Object.assign(cfg.relationships || {}, {
      tags: [TagModel],
      events: [EventModel],
      exceptions: [ExceptionModel]
    })

    super(cfg)
  }
}
