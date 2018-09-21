import ConstructModel from './Construct.js'
import ParameterModel from './Parameter.js'
import PropertyModel from './Property.js'
import MethodModel from './Method.js'

class ClassDataModel extends ConstructModel {
  constructor (cfg = {}) {
    cfg.fields = Object.assign(cfg.fields || {}, {
      fields: {
        extends: String,
        configuration: [ParameterModel],
        properties: [PropertyModel],
        methods: [MethodModel]
      }
    })

    super(cfg)
  }
}

const ClassModel = new ClassDataModel()

export default ClassModel
