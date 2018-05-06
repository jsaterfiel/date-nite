import React, { Component } from 'react'
import Axios from 'axios'
import Config from '../config'

class YelpInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      businesses: []
    }
  }

  // const search = {
  //   term: 'food',
  //   limit: 20,
  //   location: 'Jersey'
  // }

  componentWillMount = async () => {
    const businesses = await this.getBusinessInfo()
    this.setState({businesses})
  }

  getBusinessInfo = async () => {
    const BusinessSearchUrl = `${Config.PROXY_SERVER}api/yelp/businesses/`
    const info = await Axios.get(BusinessSearchUrl)

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
