import SnippetModel from './Snippet'
import ParameterModel from './Parameter'

export default class EventModel extends SnippetModel {
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
