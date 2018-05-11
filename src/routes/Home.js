import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getTrips, cancelTrip } from '../store/actions'
import Footer from '../components/Footer'
import Massive from '../components/Massive'

class Home extends Component {
  constructor (props) {
    super(props)

    this.onCancel = this.onCancel.bind(this)
  }
  componentDidMount = async props => {
    if (this.props.sessionID === '') {
      this.props.goToSignUp()
      return
    }
    this.props.getTrips(this.props.sessionID)
  }
  onCancel (evt) {
    this.props.cancelTrip(this.props.sessionID, evt.currentTarget.dataset.id)
  }
  render () {
    return (
      <div className='container'>
        <Massive />
        <div className='row'>
          <div className='col pt-5'>
            <h1>Upcoming Date Nites <span className='badge badge-secondary'>{this.props.trips.length}</span></h1>
            { this.props.tripsCancelled &&
              <div>
                <div className='alert alert-danger'>
                  <strong>Warning</strong> Due to limitations with our integration with OpenTable&trade; we are not able to delete your reservation.  Please click on the restaurant's name below to be linked over to OpenTable&trade;.
                </div>
                <div className='alert alert-warning'>
                  <strong>Alert</strong> Any Date Nite with a line through it (cancelled) will not be scheduled by Uber&trade;
                </div>
              </div>
            }
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Pick Up Time</th>
                  <th scope='col'>Restaurant</th>
                  <th scope='col'>Location</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.props.trips.map((trip) => {
                  let tripDate = new Date(trip.timestamp)
                  return (
                    <tr key={trip.tripID}>
                      <td className={(!trip.active ? 'strikeThrough' : '')}>{tripDate.toString()}</td>
                      <td className={(!trip.active ? 'strikeThrough' : '')}><a target='blank' href={trip.location.reserve_url}>{trip.location.name}</a></td>
                      <td className={(!trip.active ? 'strikeThrough' : '')}>{trip.location.address} {trip.location.city} {trip.location.state}</td>
                      <td>
                        {trip.active &&
                        <button className='btn btn-secondary' onClick={this.onCancel} data-id={trip.tripID}>Cancel</button>
                        }
                      </td>
                    </tr>
                  )
                })}
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
    },
    getTrips: (session) => {
      dispatch(getTrips(session))
    },
    cancelTrip: (session, id) => {
      dispatch(cancelTrip(session, id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
