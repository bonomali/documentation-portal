import CurrentState from '../lib/CurrentState.js'
import APIConstructor from './api.js'

import Header from './registries/header.js'
import VersionSelector from './registries/version-selector.js'
import Sidebar from './registries/sidebar.js'
import Footer from './registries/footer.js'

import View from './registries/view-controller.js'
import { HomeView as Home } from './views/home.js'

const API = new APIConstructor({
  baseURL: 'http://localhost:8000/',
  credentials: {}
})

NGN.DOM.ready(() => {
  NGN.DOM.svg.update()
  Footer.emit('populate', new Date().getFullYear())

  API.fetchProducts(products => {
    Home.once('populated', () => View.emit('goto', 'home'))
    Home.emit('populate', products)
  })
})
