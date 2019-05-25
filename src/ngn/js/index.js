// const API = new NGN.NET.Resource({
//   credentials: {},
//   baseUrl: 'http://localhost:8016/'
// })

// TEMP
NGN.Queue = NGN.Tasks

const API = {
  credentials: {},
  baseUrl: 'http://localhost:8000/'
}

const App = new AppManager()
const Data = new DataManager()

NGN.BUS.funnel(['TEMP_ALL_DEPENDENCIES_LOADED', 'DATA_FETCHED'], () => console.log(Data))

const queue = new NGN.Queue()

queue.add('Fetching NGN Documentation data...', next => {
  NGN.NET.json(API.baseUrl, (err, data) => {
    if (err) {
      throw err
    }

    Data.manifest = data

    let queue = new NGN.Queue()

    new Array('namespace', 'bus', 'exceptions').forEach(resource => {
      let url = Data.getResourceHref(resource)

      queue.add(`Fetching ${url}...`, next => {
        NGN.NET.json(url, (err, data) => {
          if (err) {
            throw err
          }

          Data.addResource(resource, data)
          next()
        })
      })
    })

    queue.on('complete', () => NGN.BUS.emit('DATA_FETCHED'))
    queue.run()
  })
})

queue.add('Loading Dependencies...', next => {
  let sync = [
    './js/registries/main.js'
  ]

  NGN.BUS.thresholdOnce('TEMP_DEPENDENCY_LOADED', sync.length, () => {
    NGN.BUS.emit('TEMP_ALL_DEPENDENCIES_LOADED')
  })

  NGNX.Loader({ sync })
})

queue.on('complete', () => console.log('Done.'))
queue.run()
