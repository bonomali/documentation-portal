import SnippetModel from './Snippet.js'
import TagModel from './Tag.js'
import EventModel from './Event.js'
import ExceptionModel from './Exception.js'

export default class ConstructModel extends SnippetModel {
  constructor (cfg = {}) {
    cfg.fieldls = Object.assign(cfg.fields || {}, {
      tags: [TagModel],
      events: [EventModel],
      exceptions: [ExceptionModel]
    })

    super(cfg)
  }
}
