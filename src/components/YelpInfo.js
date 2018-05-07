import React, { Component } from 'react'
import GeoLocator from 'geolocator'
import Axios from 'axios'
import Config from '../config'

class YelpInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      businesses: []
    }
  }

  componentWillMount = async () => {
    const self = this
    const search = {
      term: 'food',
      limit: 20
    }
    GeoLocator.locate({}, async function (err, location) {
      if (err) {
        return console.log(err)
      } else {
        search.latitude = location.coords.latitude
        search.longitude = location.coords.longitude
        const businesses = await self.getBusinessInfo(search)
        self.setState({ businesses })
      }
    })
  }

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

  render () {
    return (
      <div className='yelp-info'>
        <ul>
          {this.showInfo()}
        </ul>
      </div>
    )
  }
}

export default YelpInfo
