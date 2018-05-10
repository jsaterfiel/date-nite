import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBusinessInfo } from '../store/actions/action_yelp'
// import GeoLocator from 'geolocator'
// import Axios from 'axios'
// import Config from '../config'

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

  // getBusinessInfo = async (search) => {
  //   const BusinessSearchUrl = `${Config.PROXY_SERVER}api/yelp/businesses`
  //   const info = await Axios.get(BusinessSearchUrl, {
  //     params: search
  //   })

  //   return info.data.businesses
  // }

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

    this.props.onMarkerSelect(info)

    // const businessMatchUrl = `${Config.PROXY_SERVER}api/yelp/businesses/match`
    // const response = await Axios.get(businessMatchUrl, {
    //   params: info
    // })

    // const businessId = response.data.businesses[0].id
    // const businessByIdUrl = `${Config.PROXY_SERVER}api/yelp/businesses/${businessId}`
    // const business = await Axios.get(businessByIdUrl)

    // console.log(business.data)
    // this.setState({ restaurant_details: business.data })
  }

  showRestaurant = () => {
    let listDetail = []
    for (const key of Object.keys(this.props.restaurant_details)) {
      if (typeof this.props.restaurant_details[key] !== 'object') {
        listDetail.push(<li>{key}: {this.props.restaurant_details[key]}</li>)
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
        { this.props.restaurant_details &&
          <ul>
            {this.showRestaurant()}
          </ul>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    restaurant_details: state.restaurantDetails
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ onMarkerSelect: getBusinessInfo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(YelpInfo)

// export default YelpInfo
