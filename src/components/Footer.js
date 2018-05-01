import React, { Component } from 'react'
import { connect } from 'react-redux'

class Footer extends Component {
  render () {
    return (
      <div className='row'>
        <div className='col'>
          <nav className='nav mt-5 justify-content-end'>
            <a className='nav-link active' href='#'>About</a>
            <a className='nav-link active' href='#'>Contact Us</a>
          </nav>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state.general
}
export default connect(mapStateToProps)(Footer)
