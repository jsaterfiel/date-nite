import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import Footer from '../components/Footer'

class Welcome extends Component {
  componentDidMount = async props => {
    if (this.props.sessionID !== '') {
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
              <div className='card-img-overlay banner'>
                <Link to='sign-up' className='btn btn-primary'>Sign in/Sign up</Link>
              </div>
            </div>
          </div>
        </div>
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
