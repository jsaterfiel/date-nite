import React, { Component } from 'react'

class Footer extends Component {
  render () {
    return (
      <div className='col'>
        <nav className='nav mt-5 justify-content-end'>
          <a className='nav-link active' href='#'>About</a>
          <a className='nav-link active' href='#'>Contact Us</a>
        </nav>
      </div>
    )
  }
}

export default Footer
