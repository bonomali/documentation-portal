const PropertyModel = new NGN.DATA.Model({
  fields: Object.assign(SnippetModelFields, {
    default: String,
    readable: {
      type: Boolean,
      default: false
    },
    writable: {
      type: Boolean,
      default: false
    },
    configuration: {
      type: Boolean,
      default: false
    },
    private: {
      type: Boolean,
      default: false
    },
    static: {
      type: Boolean,
      default: false
    }
  })
})

// class PropertyModel extends SnippetModel {
//   constructor (cfg = {}) {
//     cfg.fields = Object.assign(cfg.fields || {}, {
//       default: String,
//       readable: {
//         type: Boolean,
//         default: false
//       },
//       writable: {
//         type: Boolean,
//         default: false
//       },
//       configuration: {
//         type: Boolean,
//         default: false
//       },
//       private: {
//         type: Boolean,
//         default: false
//       },
//       static: {
//         type: Boolean,
//         default: false
//       }
//     })
//
//     super(cfg)
//   }
// }
