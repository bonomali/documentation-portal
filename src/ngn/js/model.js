





const ParameterModel = new NGN.DATA.Model({
  fields: Object.assign(SnippetModelFields, {
    default: String,
    required: {
      type: Boolean,
      default: false
    },
    datatype: String,
    enum: Array
  })
})

const EventModel = new NGN.DATA.Model({
  fields: Object.assign(SnippetModelFields, {
    deprecated: {
      type: Boolean,
      default: false
    },
    replacement: String // Only used when deprecated = true
  }),

  relationships: Object.assign(SnippetModelRelationships, {
    parameters: [ParameterModel]
  })
})

const ExceptionModel = new NGN.DATA.Model({
  fields: Object.assign(SnippetModelFields, {
    severity: String,
    message: String,
    category: String,
    tags: Object
  })
})

const ConstructModel = new NGN.DATA.Model({
  fields: Object.assign(SnippetModelFields, {
    deprecated: {
      type: Boolean,
      default: false
    },
    replacement: String // Only used when deprecated = true
  }),

  relationships: Object.assign(SnippetModelRelationships, {
    parameters: [ParameterModel]
  })
})
