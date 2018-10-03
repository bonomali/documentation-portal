const ExceptionModel = new NGN.DATA.Model({
  fields: Object.assign(SnippetModelFields, {
    severity: String,
    message: String,
    category: String,
    tags: Object
  })
})


// class ExceptionModel extends SnippetModel {
//   constructor (cfg = {}) {
//     cfg.fields = Object.assign(cfg.fields || {}, {
//       severity: String,
//       message: String,
//       category: String,
//       tags: Object
//     })
//
//     super(cfg)
//   }
// }
