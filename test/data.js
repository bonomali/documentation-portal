// import ClassDataModel from '../src/lib/models/Class.js'
//
// let ClassModel = new ClassDataModel()
//
// let ClassStore = new NGN.DATA.Store({
//   name: 'ClassStore',
//   model: ClassModel
// })

import EventModel from '../src/lib/models/Event.js'

let EventDataModel = new EventModel()

let EventList = new NGN.DATA.Store({
  name: 'Event List',
  model: EventDataModel
})

NGN.NET.json('../data/api.json', (err, data) => {
  if (err) {
    throw err
  }

  Object.keys(data.bus).forEach(eventName => {
    console.log(data.bus[eventName]);
    EventList.add(data.bus[eventName])
  })

  console.log(ClassStore)
})
