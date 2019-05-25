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


// class EventModel extends SnippetModel {
//   constructor (cfg = {}) {
//     cfg.fields = Object.assign(cfg.fields || {}, {
//       deprecated: {
//         type: Boolean,
//         default: false
//       },
//       replacement: String // Only used when deprecated = true
//     })
//
//     cfg.relationships = Object.assign(cfg.relationships || {}, {
//       parameters: [ParameterModel]
//     })
//
//     super(cfg)
//   }
// }
