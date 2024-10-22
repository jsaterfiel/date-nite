import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'

import { ConnectedRouter as Router, routerMiddleware } from 'react-router-redux'

import reducers from './store/reducers' // Or wherever you keep your reducers
import registerServiceWorker from './registerServiceWorker'
import './index.css'

import App from './App'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [routerMiddleware(history), thunk]

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const composedEnhancers = compose(applyMiddleware(...middleware))
const store = createStore(
  reducers,
  composedEnhancers
)
// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
