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


// class ParameterModel extends SnippetModel {
//   constructor (cfg = {}) {
//     cfg.fields = Object.assign(cfg.fields || {}, {
//       default: String,
//       required: {
//         type: Boolean,
//         default: false
//       },
//       datatype: String,
//       enum: Array
//     })
//
//     super(cfg)
//   }
// }
