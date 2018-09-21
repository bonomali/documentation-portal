import CodePositionModel from './CodePosition.js'

export default class SnippetModel extends NGN.DATA.Model {
  constructor (cfg = {}) {
    cfg.fields = Object.assign(cfg.fields || {}, {
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
      start: CodePositionModel, // Nested Model
      end: CodePositionModel, // Nested Model
      flags: Array,
      authors: Array,
      todo: Array,
      hidden: {
        type: Boolean,
        default: false
      },
      name: function () { // Virtual Field
        return this.label
      },
      sourcefile: String
    })

    super(cfg)
  }
}
