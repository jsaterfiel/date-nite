import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import massiveImage from '../images/massive.jpg'

class Massive extends Component {
  render () {
    return (
      <div className='row'>
        <div className='col'>
          <div className='card bg-dark text-white'>
            <img className='card-img' src={massiveImage} alt='Date Nite App Banner created by John Saterfiel' />
            <div className='card-img-overlay banner'>
              {!this.props.sessionID ? (
                <Link to='sign-up' className='btn btn-primary'>Sign in/Sign up</Link>
              ) : (
                <Link to='create-date' className='btn btn-primary'>Create A Date</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return state.general
}
export default connect(mapStateToProps)(Massive)
