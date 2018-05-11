import React, { Component } from 'react'
import { locationSearch } from '../store/actions'
import { connect } from 'react-redux'

class SearchLocation extends Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick (e) {
    const val = this.props.locationSearch(document.getElementById('geoLocation').value)
    if (val !== '') {
      this.props.locationSearch(document.getElementById('geoLocation').value)
    }
  }

  render () {
    return (
      <div className='row'>
        <div className='col-sm-12 pt-2'>
          <div className='row'>
            <div className='col-xs-4 col-sm-2'>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control input-sm'
                  id='geoLocation'
                  aria-describedby='geoLocationHelp'
                  placeholder='New York, NY'
                  required
                />
              </div>
            </div>
            <div className='col-xs-4 col-sm-2'>
              <button onClick={this.onClick} className='btn btn-primary'>
                Search
              </button>
            </div>
          </div>
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
    locationSearch: (term) => {
      dispatch(locationSearch(term + ', USA'))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchLocation)
