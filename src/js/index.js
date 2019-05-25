import CurrentState from '../lib/CurrentState.js'
import APIConstructor from './api.js'

import PrimaryHeader from './registries/header/primary.js'
import VersionSelector from './registries/version-selector.js'
import SecondaryHeader from './registries/header/secondary.js'
import SearchBar from './registries/search-control.js'
import Sidebar from './registries/sidebar.js'
import Footer from './registries/footer.js'

import App from './registries/app.js'
import Content from './registries/content.js'

import Home from './content/home.js'

NGN.Queue = NGN.Tasks

const API = new APIConstructor({
  baseURL: 'http://localhost:8000/',
  credentials: {}
})

NGN.DOM.ready(() => {
  NGN.DOM.svg.update()
  Footer.emit('populate', new Date().getFullYear())

  API.fetchProducts(products => {
    NGN.BUS.funnelOnce(['content.populated', 'content.home.populated'], () => {
      Content.emit('show', 'home')
      App.state = 'ready'
    })

    Home.emit('populate', products)
    Content.emit('populate', products)
  })
})
