const ConstructModelFields = Object.assign(SnippetModelFields, {
  deprecated: {
    type: Boolean,
    default: false
  },
  replacement: String // Only used when deprecated = true
})

const ConstructModelRelationships = Object.assign(SnippetModelRelationships, {
  parameters: [ParameterModel]
})

const ConstructModel = new NGN.DATA.Model({
  fields: ConstructModelFields,
  relationships: ConstructModelRelationships
})


// class ConstructModel extends SnippetModel {
//   constructor (cfg = {}) {
//     cfg.relationships = Object.assign(cfg.relationships || {}, {
//       tags: [TagModel],
//       events: [EventModel],
//       exceptions: [ExceptionModel]
//     })
//
//     super(cfg)
//   }
// }
