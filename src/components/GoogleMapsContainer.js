import React from 'react'
import Config from '../config'
import GoogleMapLoader from './GoogleMapsLoader'
import GoogleMap from './GoogleMap'

export default () => {
  return (
    <div>
      <GoogleMapLoader
        params={{
          key: Config.GoogleConfig.API_KEY,
          libraries: 'places,geometry'
        }}
        render={(googleMaps, error) =>
          googleMaps ? (
            <div style={{ height: '300px', width: '100%' }}>
              {error && error}
              <GoogleMap
                googleMaps={googleMaps}
                coordinates={[
                  {
                    title: 'Hoboken',
                    position: {
                      lat: 40.74399,
                      lng: -74.03236
                    },
                    onLoaded: (googleMaps, map, marker) => {
                      // Define Marker InfoWindow
                      const infoWindow = new googleMaps.InfoWindow({
                        content:
                          '<div><h2> Panera Bread </h2><p> Famous for healthy Food</p><button>Book It</button><button>Details</button> </div>'
                      })

                      // Open InfoWindow when Marker will be clicked
                      googleMaps.event.addListener(marker, 'click', () => {
                        infoWindow.open(map, marker)
                      })

                      // // Change icon when Marker will be hovered
                      googleMaps.event.addListener(marker, 'mouseover', () => {
                        marker.setIcon(
                          'http://maps.google.com/mapfiles/marker_green.png'
                        )
                      })

                      googleMaps.event.addListener(marker, 'mouseout', () => {
                        marker.setIcon()
                      })

                      // Open InfoWindow directly
                      // infoWindow.open(map, marker)
                    }
                  },
                  {
                    title: 'Carlo\'s Bakery',
                    position: {
                      lat: 40.7372,
                      lng: -74.0308
                    },
                    onLoaded: (googleMaps, map, marker) => {
                      // Define Marker InfoWindow
                      const infoWindow = new googleMaps.InfoWindow({
                        content:
                          '<div><h2> Carlos Bakery </h2><p> Delicious Cake</p><button>Book It</button><button>Details</button> </div>'
                      })

                      // Open InfoWindow when Marker will be clicked
                      googleMaps.event.addListener(marker, 'click', () => {
                        infoWindow.open(map, marker)
                      })

                      // // Change icon when Marker will be hovered
                      googleMaps.event.addListener(marker, 'mouseover', () => {
                        marker.setIcon(
                          'http://maps.google.com/mapfiles/marker_green.png'
                        )
                      })

                      googleMaps.event.addListener(marker, 'mouseout', () => {
                        marker.setIcon()
                      })

                      // Open InfoWindow directly
                      // infoWindow.open(map, marker)
                    }
                  }
                ]}
                center={{ lat: 40.74399, lng: -74.03236 }}
                zoom={12}
              />
            </div>
          ) : (
            <div>
              {error === 'Network Error' ? <p>{error}</p> : <p>isLoading...</p>}
            </div>
          )
        }
      />
    </div>
  )
}
