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
            <div className='card bg-dark text-white'>
              <img className='card-img' src='http://via.placeholder.com/932x270' alt='Date Nite App User reviews background' />
              <div className='card-img-overlay'>
                <p className='card-title'>User Reviews</p>
                <p className='card-text'>My husband and I used to never be able to organize a date nite and when we did we ended up messing parts of the date up.  With date nite we are able to make a date and stick to it.</p>
                <p className='card-text'>My partner and I tended to avoid date nites due to all the stress of getting ready and then worrying about when do we have to leave and where is the restaurant.  With the Date Nite App we just need to worry about what to wear!</p>
              </div>
            </div>
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