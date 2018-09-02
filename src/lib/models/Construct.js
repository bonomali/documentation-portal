import SnippetModel from './Snippet'
import TagModel from './Tag'
import EventModel from './Event'
import ExceptionModel from './Exception'

export default class ConstructModel extends SnippetModel {
  constructor (cfg = {}) {
    cfg.fieldls = Object.assign(cfg.fields || {}, {
      tags: [TagModel],
      events: [EventModel]
      exceptions: [ExceptionModel]
    })

    super(cfg)
  }
}
