import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Footer from '../components/Footer'
import Massive from '../components/Massive'

class Welcome extends Component {
  render () {
    return (
      <div className='container'>
        <Massive />
        <div className='row'>
          <div className='col'>
            <h1>About this Website</h1>
            <h2>Team Members</h2>
            <ul>
              <li>John Saterfiel</li>
              <li>Sayan Mukherjee</li>
              <li>Sravanthi Kanchi</li>
              <li>Khushali Dave</li>
            </ul>
            <h2>Data Integrations</h2>
            <ul>
              <li><a target='_blank' rel='noopener noreferrer' href='https://www.uber.com'>Uber&trade;</a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='https://www.opentable.com'>OpenTable&trade;</a> data via heroku app created by <a target='_blank' rel='noopener noreferrer' href='https://gist.github.com/andrewonj/3531613'>adrewonj</a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='https://developers.google.com/maps/documentation/javascript/tutorial'>Google&trade; Maps</a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='https://www.yelp.com'>Yelp&trade;</a></li>
            </ul>
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
    goToHome: () => {
      dispatch(push('/home'))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
