import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import uberLogo from '../providerLogos/uber_logo.png'
import Footer from '../components/Footer'
import Config from '../config'
import API from '../services/api'
import { sessionSet, codeSet } from '../store/actions'

const QueryStringCodeCheck = '?code='
const LoginURL = 'https://login.uber.com/oauth/v2/authorize?client_id=' + Config.UberClientID + '&response_type=code'

class SigningUp extends Component {
  componentDidMount = async props => {
    if (window.location.search.indexOf(QueryStringCodeCheck) === 0) {
      const code = window.location.search.replace(QueryStringCodeCheck, '')
      this.props.setCode(code)
      const sessionData = await API.signUp(code)
      console.log('session', sessionData)
      if (sessionData === null || sessionData.sessionID === null) {
        this.props.setCode('')
        this.props.reloadPage()
        return
      }
      this.props.setSessionData(sessionData)
      this.props.goToHome()
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
            {this.props.code !== '' ? (
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

const mapStateToProps = state => {
  return state.general
}
const mapDispatchToProps = dispatch => {
  return {
    setSessionData: data => {
      dispatch(sessionSet(data))
    },
    setCode: code => {
      dispatch(codeSet(code))
    },
    goToHome: () => {
      dispatch(push('/home'))
    },
    reloadPage: () => {
      dispatch(push('/sign-up'))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SigningUp)
