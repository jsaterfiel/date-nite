import Config from '../config'
import GoogleMapLoader from './GoogleMapsLoader'
import GoogleMap from './GoogleMap'
import { searchLocations, locationSet } from '../store/actions'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import API from '../services/api'

class GoogleMapsContainer extends Component {
  componentDidMount = async () => {
    await this.props.searchLocations(this.props.mapCenter.lng, this.props.mapCenter.lat, 10000, 3)
  }

  render () {
    let coords = []
    let locsLookup = []
    let infoWindow = null
    let onClick = (evt) => {
      console.log(evt.target.dataset.id)
      this.props.locationSet(locsLookup[evt.target.dataset.id])
    }
    for (let loc of this.props.locations) {
      locsLookup[loc._id] = loc
      coords.push({
        title: loc.name,
        position: {
          lng: loc.location.coordinates[0],
          lat: loc.location.coordinates[1]
        },
        onLoaded: (googleMaps, map, marker) => {
          // Open InfoWindow when Marker will be clicked
          googleMaps.event.addListener(marker, 'click', async () => {
            let biz = await API.getBusinessInfo({
              name: loc.name,
              longitude: loc.location.coordinates[0],
              latitude: loc.location.coordinates[1],
              city: loc.city,
              state: loc.state
            })
            if (biz === null) {
              biz = {
                url: loc.reserve_url,
                rating: '?',
                review_count: '???'
              }
            }
            if (biz.price === undefined) {
              biz.price = '$$'
            }
            if (infoWindow === null) {
              infoWindow = new googleMaps.InfoWindow()
              infoWindow.addListener('domready', () => {
                document.getElementById('pick-location').addEventListener('click', onClick.bind(this))
              })
            }
            infoWindow.setContent(`<div style='width:200px'><h1 class='h6'><a target='_blank' rel='noopener noreferrer' href='${biz.url}'>${loc.name}</a></h1><p><b>price:</b> ${biz.price}<br><b>ratings:</b> ${biz.rating}/5&nbsp;&nbsp;<b>review:</b> ${biz.review_count}<br/></p><img src='${loc.image_url}'><p style='padding-top:10px'><button class='btn btn-primary' id='pick-location' data-id='${loc._id}'>Pick Restaurant</button></p></div>`)
            infoWindow.open(map, marker)
          })

          // Open InfoWindow directly
          // infoWindow.open(map, marker)
        }
      })
    }
    const centerLoc = { lat: this.props.mapCenter.lat, lng: this.props.mapCenter.lng }
    return (
      <div>
        <GoogleMapLoader
          params={{
            key: Config.GoogleConfig.API_KEY,
            libraries: 'places,geometry'
          }}
          render={(googleMaps, error) =>
            googleMaps ? (
              <div style={{ height: '500px', width: '100%' }}>
                {error && error}
                <GoogleMap
                  googleMaps={googleMaps}
                  coordinates={coords}
                  center={centerLoc}
                  zoom={13}
                />
              </div>
            ) : (
              <div>
                {error === 'Network Error' ? (
                  <p>{error}</p>
                ) : (
                  <p>isLoading...</p>
                )}
              </div>
            )
          }
        />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return state.general
}
const mapDispatchToProps = dispatch => {
  return {
    searchLocations: (lng, lat, radius, price) => {
      dispatch(searchLocations(lng, lat, radius, price))
    },
    locationSet: (location) => {
      dispatch(locationSet(location))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapsContainer)
