import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setDateAndCount } from '../store/actions/action_date_count'
import DatePicker from 'react-datepicker'
import Moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'
import '../styles/create_date_header.css'

const COUNT = [2, 3, 4]
// const DEFAULT_COUNT = 2

class CreateDateHeader extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentDate: Moment(),
      selectedDate: null
    }
  }

  countOptions = () => {
    return COUNT.map(option => {
      return <span key={option} onClick={() => this.onSelectCountChange(option)} className='dropdown-item'>{option}</span>
    })
  }

  onSelectCountChange = (newCount) => {
    const currentDate = this.props.dateAndCount.dateTime
    this.props.onDateAndCountChange({count: newCount, dateTime: currentDate})
  }

  onSelectDateChange = (date) => {
    const currentCount = this.props.dateAndCount.count
    this.props.onDateAndCountChange({count: currentCount, dateTime: date})
  }

  render () {
    return (
      <div className='create-date-header'>
        <div className='create-date-nav navbar navbar-dark bg-dark'>
          <div className='container'><h1 class='text-light'>Create Date</h1></div>
          <div className='input-group mb-3 count-container'>
            <div className='input-group-prepend'>
              <button className='btn btn-outline-info dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Count</button>
              <div className='dropdown-menu'>
                {this.countOptions()}
              </div>
            </div>
            <input type='text' onChange={e => this.onSelectCountChange(e.target.value)} value={this.props.dateAndCount.count} className='form-control count-text' aria-label='Text input with dropdown button' />
          </div>
          <DatePicker className='custom-datepicker' id='dateWhen'
            minDate={this.state.currentDate} selected={this.props.dateAndCount.dateTime}
            showTimeSelect
            dateFormat='LLL'
            timeFormat='h:mm a'
            timeCaption='Time'
            minTime={Moment().hours(13).minutes(0)}
            maxTime={Moment().hours(23)}
            onChange={this.onSelectDateChange} placeholderText='When is your date?' />
        </div>
      </div >
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
  return bindActionCreators({ onDateAndCountChange: setDateAndCount }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDateHeader)
