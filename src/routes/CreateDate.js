import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import CreateDateHeader from '../components/CreateDateHeader'
import Footer from '../components/Footer'
import SearchLocation from '../components/SearchLocation'
import GoogleMapContainer from '../components/GoogleMapsContainer'
import { setDateAndCount } from '../store/actions/action_date_count'
import { estimateTrip, pickupAddress } from '../store/actions'
import DatePicker from 'react-datepicker'
import Moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'
import '../styles/create_date_header.css'

class CreateDate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showGoogle: false,
      currentDate: Moment(),
      selectedDate: null
    }

    this.onEstimateTrip = this.onEstimateTrip.bind(this)
    this.onPickupAddress = this.onPickupAddress.bind(this)
  }

  componentDidMount = async props => {
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

  onPickupAddress = (evt) => {
    this.props.pickupAddress(evt.target.value)
  }

  onEstimateTrip = () => {
    this.props.estimateTrip(this.props.general.sessionID, this.props.general.pickupAddress, this.props.general.location)
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
        {this.props.dateAndCount.dateTime > 0 &&
        <div>
          <div className='row'>
            <div className='col-8'>
              <h2>Schedule Ride</h2>
              <div className='form-group'>
                <label htmlFor='pickLocation'>Pickup Location</label>
                <input type='text' className='form-control' id='pickLocation' aria-describedby='pickupLocation' placeholder='Enter pickup location like 1600 Pennsylvania ave, Washington, DC' onChange={this.onPickupAddress} />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <button className='btn btn-primary' onClick={this.onEstimateTrip}>Estimate Trip</button>
              {this.props.general.estimatedTrip !== null &&
                <div className='pt-2'>
                  {/* {"productID":"bbec56dc-1c72-44ea-ba64-fe51bf392c09","productImage":"http://d1a3f4spazzrp4.cloudfront.net/car-types/mono/mono-uberx.png","productName":"uberX","pickupTime":120,"estimate":"$7-9"} */}
                  <h3>Uber&trade; Car Service</h3>
                  <div><img alt='Uber car logo' src={this.props.general.estimatedTrip.productImage} /> {this.props.general.estimatedTrip.productName}</div>
                  <div><strong>Estimated Price:</strong> {this.props.general.estimatedTrip.estimate}</div>
                  <div><strong>Estimated travel time:</strong> {Math.floor(this.props.general.estimatedTrip.totalTime / 60)} minutes</div>
                  <button className='btn btn-primary'>Book It</button>
                </div>
              }
            </div>
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
    },
    estimateTrip: (session, address, location) => {
      dispatch(estimateTrip(session, address, location))
    },
    pickupAddress: (address) => {
      dispatch(pickupAddress(address))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDate)
