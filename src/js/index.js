import CurrentState from '../lib/CurrentState.js'
import APIConstructor from './api.js'

import Header from './registries/header.js'
import VersionSelector from './registries/version-selector.js'
import SearchBar from './registries/search-control.js'
import Sidebar from './registries/sidebar.js'
import Footer from './registries/footer.js'

import ViewController from './registries/view-controller.js'
import { HomeView as Home } from './views/home.js'

NGN.Queue = NGN.Tasks

const API = new APIConstructor({
  baseURL: 'http://localhost:8000/',
  credentials: {}
})

NGN.BUS.on({
  views: {
    loading: () => Header.state = 'loading',
    loaded: () => Header.state = 'loaded'
  }
})

NGN.DOM.ready(() => {
  NGN.DOM.svg.update()
  Footer.emit('populate', new Date().getFullYear())

  API.fetchProducts(products => {
    NGN.BUS.funnelOnce(['views.populated', 'views.home.populated'], () => {
      ViewController.emit('goto', 'home')
    })

    Home.emit('populate', products)
    ViewController.emit('populate', products)
  })
})
