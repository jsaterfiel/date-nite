import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './routes/Home'
import Welcome from './routes/Welcome'
import CreateDate from './routes/CreateDate'
import SigningUp from './routes/SigningUp'

import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/sign-up' component={SigningUp} />
          <Route exact path='/create-date' component={CreateDate} />
        </Switch>
      </div>
    )
  }
}

export default App
