import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
  render () {
    return (
      <div className='row'>
        <div className='col'>
          <nav className='nav mt-5 justify-content-end'>
            <a className='nav-link active' href='#'>About</a>
            <a className='nav-link active' href='#'>Contact Us</a>
            <Link to='create-date' className='nav-link active'>Create Date</Link>
          </nav>
        </div>
      </div>
    )
  }
}

export default Footer
