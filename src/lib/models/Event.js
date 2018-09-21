import SnippetModel from './Snippet.js'
import ParameterModel from './Parameter.js'

class EventDataModel extends SnippetModel {
  constructor (cfg = {}) {
    cfg.fields = Object.assign(cfg.fields || {}, {
      parameters: [ParameterModel],
      deprecated: {
        type: Boolean,
        default: false
      },
      replacement: String // Only used when deprecated = true
    })

    super(cfg)
  }
}

const EventModel = new EventDataModel()

export default EventModel
