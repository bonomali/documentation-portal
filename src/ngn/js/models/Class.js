class ClassModel extends ConstructModel {
  constructor (cfg = {}) {
    cfg.fields = Object.assign(cfg.fields || {}, {
      extends: String
    })

    cfg.relationships = Object.assign(cfg.relationships || {}, {
      configuration: [ParameterModel],
      properties: [PropertyModel],
      methods: [MethodModel]
    })

    super(cfg)
  }
}
