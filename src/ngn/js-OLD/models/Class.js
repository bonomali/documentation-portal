const ClassModelFields = {
  extends: String
}

const ClassModelRelationships = {
  configuration: [ParameterModel],
  properties: [PropertyModel],
  methods: [MethodModel]
}

const ClassModel = new NGN.DATA.Model({
  fields: Object.assign(ConstructModelFields, ClassModelFields),
  relationships: Object.assign(ConstructModelRelationships, ClassModelRelationships)
})

NGN.BUS.emit('product.model.initiated')


// class ClassModel extends ConstructModel {
//   constructor (cfg = {}) {
//     cfg.fields = Object.assign(cfg.fields || {}, {
//       extends: String
//     })
//
//     cfg.relationships = Object.assign(cfg.relationships || {}, {
//       configuration: [ParameterModel],
//       properties: [PropertyModel],
//       methods: [MethodModel]
//     })
//
//     super(cfg)
//   }
// }
