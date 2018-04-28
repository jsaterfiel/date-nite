import React, { Component } from 'react'
import uberLogo from '../providerLogos/uber_logo.png'
import Footer from '../components/Footer'
import Config from '../config'

class SigningUp extends Component {
  constructor (props) {
    super(props)

    this.loginURL = 'https://login.uber.com/oauth/v2/authorize?client_id=' + Config.UberClientID + '&response_type=code&scope=offline_access%20profile%20request'
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
                <p className='card-text'>To get our services working we'll need you to sign into the various providers we're connecting together for you.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col mt-5 mb-5'>
            {/* Use alert once a step is completed and remove the button Also can change the alert class to warning if an error occurs and show the button still */}
            <div className='alert alert-primary' role='alert'>You've signed in with uber!</div>
            <a href={this.loginURL} className='btn btn-primary'>Sign in with Uber for handling rides <img src={uberLogo} alt='Uber logo' width='70px' /></a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default SigningUp
