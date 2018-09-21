class MethodModel extends ConstructModel {
  constructor (cfg = {}) {
    cfg.fields = Object.assign(cfg.fields || {}, {
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

    cfg.relationships = Object.assign(cfg.relationships || {}, {
      arguments: [ParameterModel],
      return: ReturnModel
    })

    super(cfg)
  }
}
