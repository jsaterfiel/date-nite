import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import CreateDateHeader from '../components/CreateDateHeader'
import Footer from '../components/Footer'
import SearchLocation from '../components/SearchLocation'
import GoogleMapContainer from '../components/GoogleMapsContainer'
import { setDateAndCount } from '../store/actions/action_date_count'
import DatePicker from 'react-datepicker'
import Moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'
import '../styles/create_date_header.css'

class CreateDate extends Component {
  state = {
    showGoogle: false,
    currentDate: Moment(),
    selectedDate: null
  }

  componentDidMount = async props => {
    console.log(this.props.sessionID)
    if (this.props.sessionID === 'undefined' || this.props.sessionID === '') {
      this.props.goToSignUp()
    }
  }

  handleSearch (e) {
    this.setState((prevState, prevProps) => {
      return { showGoogle: !prevState.showGoogle }
    })
  }

  onSelectDateChange = (date) => {
    const currentCount = this.props.dateAndCount.count
    this.props.onDateAndCountChange({count: currentCount, dateTime: date})
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <CreateDateHeader />
          </div>
        </div>
        <SearchLocation />

        {
          //    this.state.showGoogle && (
          <div>
            <GoogleMapContainer />
          </div>
          // )
        }
        {this.props.general.location !== null &&
          <div className='row'>
            <div className='col'>
              <h2>Selected Restaurant</h2>
              <div className='alert alert-danger' role='alert'><strong>Alert</strong> Due to current limitations in the site's implementation with OpenTable&trade; we are unable to book restaurants for you currently.  We are working with OpenTable&trade; to resolve this issue as quickly as possible.  Until then, please follow the booking link for the restaurant to OpenTable's &trade; site and tell us at what date and time your reservation is at.</div>
              <p className='h3'>{this.props.general.location.name}</p>
              <a href={this.props.general.location.reserve_url} target='_blank' rel='noopener noreferrer' className='btn btn-primary'>Book Your Reservation on OpenTable&trade;</a>
              <div className='form-group pt-3 pb-3'>
                <DatePicker className='custom-datepicker' id='dateWhen'
                  minDate={this.state.currentDate} selected={this.props.dateAndCount.dateTime}
                  showTimeSelect
                  dateFormat='LLL'
                  timeFormat='h:mm a'
                  timeCaption='Time'
                  minTime={Moment().hours(13).minutes(0)}
                  maxTime={Moment().hours(23)}
                  onChange={this.onSelectDateChange} placeholderText='Reservation Time' />
              </div>
            </div>
          </div>
        }
        {this.props.general.reservationDate > 0 &&
          <div className='row'>
            <div className='col'>
              <h2>Schedule Ride</h2>
              <div className='form-group'>
                <label htmlFor='pickLocation'>Pickup Location</label>
                <input type='text' className='form-control' id='pickLocation' aria-describedby='pickupLocation' placeholder='Enter pickup location like 1600 Pennsylvania ave, Washington, DC' /> <button className='btn btn-primary'>Estimate Trip</button>
              </div>
              {this.props.general.pickupAddress !== null &&
                <div>
                  <ul>
                    <li>Uber Car Service:</li>
                    <li><input type='radio' disabled='disabled' checked='checked' />icon UberX</li>
                    <li>Estimated Price: $40-80</li>
                    <li>Estimated travel time (google travel time + uber pickup time + 5 min)</li>
                  </ul>
                  <button className='btn btn-primary'>Book It</button>
                </div>
              }
            </div>
          </div>
        }
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dateAndCount: state.dateAndCount,
    general: state.general
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goToSignUp: () => {
      dispatch(push('/sign-up'))
    },
    onDateAndCountChange: (obj) => {
      dispatch(setDateAndCount(obj))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDate)
