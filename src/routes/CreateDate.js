import React, { Component } from 'react'
import CreateDateHeader from '../components/CreateDateHeader'
import Footer from '../components/Footer'

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
        </div>
        <Footer />
      </div>
    )
  }
}

export default CreateDate
