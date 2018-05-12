import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import CreateDateHeader from '../components/CreateDateHeader'
import Footer from '../components/Footer'
import SearchLocation from '../components/SearchLocation'
import GoogleMapContainer from '../components/GoogleMapsContainer'
import DatePicker from 'react-datepicker'
import Moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'
import '../styles/create_date_header.css'

class CreateDate extends Component {
  state = {
    showGoogle: false
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
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <CreateDateHeader />
          </div>
        </div>
        <SearchLocation handleSearch={this.handleSearch.bind(this)} />

        {
          //    this.state.showGoogle && (
          <div>
            <GoogleMapContainer />
          </div>
          // )
        }
        <div className='row'>
          <div className='col'>
            <h2>Selected Restaurant</h2>
            <div>notice about opentable problems</div>
            <div>open table loc link</div>
            <div className='form-group'>
              <DatePicker className='custom-datepicker' id='dateWhen'
                // minDate={this.state.currentDate} selected={this.props.dateAndCount.dateTime}
                showTimeSelect
                dateFormat='LLL'
                timeFormat='h:mm a'
                timeCaption='Time'
                minTime={Moment().hours(13).minutes(0)}
                maxTime={Moment().hours(23)}
                onChange={this.onSelectDateChange} placeholderText='When is your reservation?' />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h2>Schedule Ride</h2>
            <div className='form-group'>
              <label htmlFor='pickLocation'>Pickup Location</label>
              <input type='text' className='form-control' id='pickLocation' aria-describedby='pickupLocation' placeholder='Enter pickup location like 1600 Pennsylvania ave, Washington, DC' /> <button className='btn btn-primary'>Estimate Trip</button>
            </div>
            <div>
              <ul>
                <li>Uber Car Service:</li>
                <li><input type='radio' disabled='disabled' checked='checked' />icon UberX</li>
                <li>Estimated Price: $40-80</li>
                <li>Estimated travel time (google travel time + uber pickup time + 5 min)</li>
              </ul>
              <button className='btn btn-primary'>Book It</button>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateDate)