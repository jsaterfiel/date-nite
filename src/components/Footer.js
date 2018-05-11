import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/actions'

class Footer extends Component {
  constructor (props) {
    super(props)

    this.onLogout = this.onLogout.bind(this)
  }
  onLogout () {
    this.props.onLogout(this.props.sessionID)
  }
  render () {
    return (
      <div className='row'>
        <div className='col'>
          <nav className='nav mt-5 justify-content-end'>
            <Link to='/about' className='nav-link active'>About the Website</Link>
            {this.props.sessionID &&
              <button className='btn btn-secondary' onClick={this.onLogout}>Logout</button>
            }
          </nav>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return state.general
}
const mapDispatchToProps = dispatch => {
  return {
    onLogout: (session) => {
      dispatch(logout(session))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer)
