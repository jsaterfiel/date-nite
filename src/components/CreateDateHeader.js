import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import Moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'
import '../styles/create_date_header.css'

const COUNT = [2, 3, 4, 5, 6, 7, 8]
const DEFAULT_COUNT = 2

class CreateDateHeader extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentDate: Moment(),
      selectedDate: null,
      count: DEFAULT_COUNT
    }
  }

  countOptions = () => {
    return COUNT.map(option => {
      return <span key={option} onClick={() => this.onSelectCountChange(option)} className='dropdown-item'>{option}</span>
    })
  }

  onSelectCountChange = (newCount) => {
    this.setState({
      count: newCount
    })
  }

  onSelectDateChange = (date) => {
    this.setState({
      selectedDate: date
    })
  }

  render () {
    return (
      <div className='create-date-header'>
        <nav className='create-date-nav navbar navbar-dark bg-dark'>
          <div className='input-group mb-3 count-container'>
            <div className='input-group-prepend'>
              <button className='btn btn-outline-info dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Count</button>
              <div className='dropdown-menu'>
                {this.countOptions()}
              </div>
            </div>
            <input type='text' onChange={(value) => this.setState({count: value})} value={this.state.count} className='form-control count-text' aria-label='Text input with dropdown button' />
          </div>
          <DatePicker className='custom-datepicker' id='dateWhen'
            minDate={this.state.currentDate} selected={this.state.selectedDate}
            showTimeSelect
            dateFormat='LLL'
            timeFormat='h:mm a'
            timeCaption='Time'
            minTime={Moment().hours(13).minutes(0)}
            maxTime={Moment().hours(23)}
            onChange={this.onSelectDateChange} placeholderText='When is your date?' />
        </nav>
      </div >
    )
  }
}

export default CreateDateHeader
