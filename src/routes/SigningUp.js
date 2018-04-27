import React, { Component } from 'react'
import uberLogo from '../providerLogos/uber_logo.png'
import Footer from '../components/Footer'

class SignUp extends Component {
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
            <button type='button' className='btn btn-primary'>Sign in with Uber for handling rides <img src={uberLogo} alt='Uber logo' width='70px' /></button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default SignUp
