import SnippetModel from './Snippet.js'

class PropertyDataModel extends SnippetModel {
  constructor (cfg = {}) {
    cfg.fields = Object.assign(cfg.fields || {}, {
      default: String,
      readable: {
        type: Boolean,
        default: false
      },
      writable: {
        type: Boolean,
        default: false
      },
      configuration: {
        type: Boolean,
        default: false
      },
      private: {
        type: Boolean,
        default: false
      },
      static: {
        type: Boolean,
        default: false
      }
    })

    super(cfg)
  }
}

const PropertyModel = new PropertyDataModel()

export default PropertyModel
