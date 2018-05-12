import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setDateAndCount } from '../store/actions/action_date_count'

const COUNT = [2, 3, 4]
// const DEFAULT_COUNT = 2

class CreateDateHeader extends Component {
  constructor (props) {
    super(props)

    this.state = {
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

  render () {
    return (
      <div className='create-date-header'>
        <div className='create-date-nav navbar navbar-dark bg-dark'>
          <div className='container'>
            <h1 className='text-light'>Create Date</h1>
            <Link to='/home' className='nav-item nav-link text-light text-underline'><h2><u>Home</u></h2></Link>
          </div>
          <div className='input-group mb-3 count-container'>
            <div className='input-group-prepend'>
              <button className='btn btn-outline-info dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Count</button>
              <div className='dropdown-menu'>
                {this.countOptions()}
              </div>
            </div>
            <input type='text' onChange={e => this.onSelectCountChange(e.target.value)} value={this.props.dateAndCount.count} className='form-control count-text' aria-label='Text input with dropdown button' />
          </div>
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
