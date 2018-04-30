import React, { Component } from 'react'
import uberLogo from '../providerLogos/uber_logo.png'
import Footer from '../components/Footer'
import Config from '../config'
import API from '../services/api'

const QueryStringCodeCheck = '?code='
const LoginURL = 'https://login.uber.com/oauth/v2/authorize?client_id=' + Config.UberClientID + '&response_type=code'

class SigningUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionID: '',
      code: ''
    }
  }

  componentDidMount = async props => {
    if (window.location.search.indexOf(QueryStringCodeCheck) === 0) {
      const code = window.location.search.replace(QueryStringCodeCheck, '')
      this.setState({
        code: code
      })
      const sessionID = await API.signUp(code)
      this.setState({
        sessionID: sessionID
      })
      // TODO: store session ID in redux store
      // TODO: redirect user to /home with router redux history
    }
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='card bg-dark text-white'>
              <img className='card-img' src='http://via.placeholder.com/932x270' alt='Date Nite App Banner' />
              <div className='card-img-overlay'>
                <h1 className='card-title'>Sign Up</h1>
                <p className='card-text'>To get our services working we'll need you to authorize our site to interact with Uber on your behalf.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col mt-5 mb-5'>
            {this.state.code !== '' ? (
              <div className='alert alert-primary' role='alert'>You've signed in with uber!</div>
            ) : (
              <a href={LoginURL} className='btn btn-primary'>Sign in with Uber for handling rides <img src={uberLogo} alt='Uber logo' width='70px' /></a>
            )}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default SigningUp
