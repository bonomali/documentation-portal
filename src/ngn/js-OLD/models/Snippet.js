const SnippetModelFields = {
  type: {
    type: String,
    required: true,
    enum: [
      'class',
      'method',
      'property',
      'event',
      'namespace',
      'configuration',
      'exception',
      'parameter',
      'argument'
    ]
  },

  label: {
    type: String,
    required: true
  },

  description: String,
  code: String,
  flags: Array,
  authors: Array,
  todo: Array,

  hidden: {
    type: Boolean,
    default: false
  },

  sourcefile: String
}

const SnippetModelRelationships = {
  start: CodePositionModel,
  end: CodePositionModel
}

const SnippetModelVirtuals = {
  name: function () {
    return this.label
  }
}

const SnippetModel = new NGN.DATA.Model({
  fields: SnippetModelFields,
  relationships: SnippetModelRelationships,
  virtuals: SnippetModelVirtuals
})


// class SnippetModel extends NGN.DATA.Model {
//   constructor (cfg = {}) {
//     cfg.fields = Object.assign(cfg.fields || {}, {
//       type: {
//         type: String,
//         required: true,
//         enum: [
//           'class',
//           'method',
//           'property',
//           'event',
//           'namespace',
//           'configuration',
//           'exception',
//           'parameter',
//           'argument'
//         ]
//       },
//
//       label: {
//         type: String,
//         required: true
//       },
//
//       description: String,
//       code: String,
//       flags: Array,
//       authors: Array,
//       todo: Array,
//
//       hidden: {
//         type: Boolean,
//         default: false
//       },
//
//       sourcefile: String
//     })
//
//     cfg.virtuals = Object.assign(cfg.virtuals || {}, {
//       name: function () { // Virtual Field
//         return this.label
//       }
//     })
//
//     cfg.relationships = Object.assign(cfg.relationships || {}, {
//       start: CodePositionModel,
//       end: CodePositionModel
//     })
//
//     super(cfg)
//   }
// }
