import React, { Component } from 'react'
// import GeoLocator from 'geolocator'
import Axios from 'axios'
import Config from '../config'

class YelpInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      businesses: [],
      restaurant_name: '',
      latitude: '',
      longitude: '',
      city: '',
      state: '',
      restaurant_details: null
    }
  }

  /* DO NOT DELETE COMMENTED LOC */

  // componentWillMount = async () => {
  //   const self = this
  //   const search = {
  //     term: 'food',
  //     limit: 20
  //   }
  //   GeoLocator.locate({}, async function (err, location) {
  //     if (err) {
  //       return console.log(err)
  //     } else {
  //       search.latitude = location.coords.latitude
  //       search.longitude = location.coords.longitude
  //       const businesses = await self.getBusinessInfo(search)
  //       self.setState({ businesses })
  //     }
  //   })
  // }

  getBusinessInfo = async (search) => {
    const BusinessSearchUrl = `${Config.PROXY_SERVER}api/yelp/businesses`
    const info = await Axios.get(BusinessSearchUrl, {
      params: search
    })

    return info.data.businesses
  }

  showInfo = () => {
    let items

    if (this.state.businesses.length > 0) {
      items = this.state.businesses.map(business => {
        return (
          <li key={business.id}>
            {business.name}, Rating: {business.rating}
          </li>
        )
      })
    } else {
      items = <li>No Results</li>
    }

    return items
  }

  onSearch = async (e) => {
    e.preventDefault()

    const info = {
      name: this.state.restaurant_name,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      city: this.state.city,
      state: this.state.state
    }
    const BusinessMatchUrl = `${Config.PROXY_SERVER}api/yelp/businesses/match`
    const response = await Axios.get(BusinessMatchUrl, {
      params: info
    })

    const business = response.data.businesses[0]
    console.log(business)
    this.setState({ restaurant_details: business })
  }

  showRestaurant = () => {
    let listDetail = []
    for (const key of Object.keys(this.state.restaurant_details)) {
      if (typeof this.state.restaurant_details[key] !== 'object') {
        listDetail.push(<li>{key}: {this.state.restaurant_details[key]}</li>)
      }
    }

    return listDetail
  }

  render () {
    return (
      // <div className='yelp-info'>
      //   <ul>
      //     {this.showInfo()}
      //   </ul>
      // </div>
      <div>
        <form onSubmit={this.onSearch}>
          <div className='input-group search-bar'>
            <input type='text'
              className='form-control'
              placeholder='Restaurant'
              value={this.state.restaurant_name}
              onChange={e => this.setState({ restaurant_name: e.target.value })}
            />
            <input type='text'
              className='form-control'
              placeholder='Lat'
              value={this.state.latitude}
              onChange={e => this.setState({ latitude: e.target.value })}
            />
            <input type='text'
              className='form-control'
              placeholder='Long'
              value={this.state.longitude}
              onChange={e => this.setState({ longitude: e.target.value })}
            />
            <input type='text'
              className='form-control'
              placeholder='City'
              value={this.state.city}
              onChange={e => this.setState({ city: e.target.value })}
            />
            <input type='text'
              className='form-control'
              placeholder='state'
              value={this.state.state}
              onChange={e => this.setState({ state: e.target.value })}
            />
            <span className='input-group-btn'>
              <button className='btn btn-primary' type='submit'>Go!</button>
            </span>
          </div>
        </form>
        { this.state.restaurant_details &&
          <ul>
            {this.showRestaurant()}
          </ul>
        }
      </div>
    )
  }
}

export default YelpInfo
