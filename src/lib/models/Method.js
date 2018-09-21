import ConstructModel from './Construct.js'
import ParameterModel from './Parameter.js'
import ReturnModel from './Return.js'

class MethodDataModel extends ConstructModel {
  constructor (cfg = {}) {
    cfg.fields = Object.assign(cfg.fields || {}, {
      arguments: [ParameterModel],
      return: ReturnModel,
      kind: String,
      generator: {
        type: Boolean,
        default: false
      },
      static: {
        type: Boolean,
        default: false
      },
      computed: {
        type: Boolean,
        default: false
      },
      async: {
        type: Boolean,
        default: false
      },
      private: {
        type: Boolean,
        default: false
      },
      override: String,
      super: String
    })

    super(cfg)
  }
}

const MethodModel = new MethodDataModel()

export default MethodModel
