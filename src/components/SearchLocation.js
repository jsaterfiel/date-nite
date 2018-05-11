import React, { Component } from 'react'

class SearchLocation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchQuery: ''
    }
  }

  onSubmit (e) {
    // e.preventDefault()

    if (this.state.searchQuery) {
      this.props.handleSearch(this.state.searchQuery)
    }
  }

  onSearchQueryChange (e) {
    this.setState({
      searchQuery: e.target.value
    })
  }

  render () {
    return (
      <div className='row'>
        <div className='col-sm-12'>
          <form className='form-inline' onSubmit={this.onSubmit.bind(this)}>
            <div className='row'>
              <div className='col-xs-8 col-sm-10'>
                <div className='form-group'>
                  <input
                    type='text'
                    value={this.state.searchQuery}
                    onChange={this.onSearchQueryChange.bind(this)}
                    className='form-control input-lg'
                    id='geoLocation'
                    aria-describedby='geoLocationHelp'
                    placeholder='Hoboken, NJ, USA'
                    required
                  />
                </div>
              </div>
              <div className='col-xs-4 col-sm-2'>
                <button type='submit' className='btn btn-primary'>
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SearchLocation
