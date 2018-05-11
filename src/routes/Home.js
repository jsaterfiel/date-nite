import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Footer from '../components/Footer'
import Massive from '../components/Massive'

class Home extends Component {
  componentDidMount = async props => {
    if (this.props.sessionID === '') {
      this.props.goToSignUp()
    }
  }

  render () {
    return (
      <div className='container'>
        <Massive />
        <div className='row'>
          <div className='col pt-5'>
            <h2>Upcoming Date Nites <span className='badge badge-secondary'>4</span></h2>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>Date</th>
                  <th scope='col'>Place</th>
                  <th scope='col'>Location</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    5/8/2017 7:00 pm
                  </td>
                  <td>
                  La Lucca
                  </td>
                  <td>
                    New York, NY
                  </td>
                  <td scope='row'>
                    <a href='#'>View</a>
                  </td>
                </tr>
              </tbody>
            </table>
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
    goToSignUp: () => {
      dispatch(push('/sign-up'))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
