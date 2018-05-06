import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateDateHeader from '../components/CreateDateHeader'
import Footer from '../components/Footer'
import YelpInfo from '../components/YelpInfo'

class CreateDate extends Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <CreateDateHeader />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            MAP GOES HERE!
          </div>
          <YelpInfo />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state.general
}
export default connect(mapStateToProps)(CreateDate)
