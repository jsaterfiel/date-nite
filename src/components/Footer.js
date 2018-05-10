import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Footer extends Component {
  render () {
    return (
      <div className='row'>
        <div className='col'>
          <nav className='nav mt-5 justify-content-end'>
            <Link to='/about' className='nav-link active'>About</Link>
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
