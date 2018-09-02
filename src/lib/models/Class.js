import ConstructModel from './Construct'
import ParameterModel from './Parameter'
import PropertyModel from './Property'
import MethodModel from './Method'

export default class ClassModel extends ConstructModel {
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
})
