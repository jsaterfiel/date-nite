import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import Moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'
import '../styles/create_date.css'

class CreateDateHeader extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentDate: Moment(),
      selectedDate: null
    }
  }

  onSelectDateChange = (date) => {
    this.setState({
      selectedDate: date
    })
  }

  render () {
    return (
      <div className='create-date-header'>
        <h1>Create A Date</h1>
        <div className='form-group mb-3'>
          <label for='dateCount'>How Many will be attending the date?</label>
          <select className='form-control' id='dateCount'>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <label for='dateWhen'>When would you like this date to occur?</label>
          <DatePicker className='custom-datepicker' id='dateWhen'
            minDate={this.state.currentDate} selected={this.state.selectedDate}
            showTimeSelect
            timeFormat='h:mm a'
            timeCaption='time'
            minTime={Moment().hours(13).minutes(0)}
            maxTime={Moment().hours(23)}
            onChange={this.onSelectDateChange} placeholderText='When is your date?' />
        </div>
      </div>
    )
  }
}

export default CreateDateHeader
