import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import 'src/app/static/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './store/store'
import Routing from './routes'

const App = () => {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  )
}

export default App