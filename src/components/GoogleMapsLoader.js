import React from 'react'
import PropTypes from 'prop-types'

import loadGoogleMapsSdk from '../utils/loadGoogleMapSdk'

class GoogleMapsLoader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      googleMaps: null,
      error: null
    }
  }

  componentDidMount () {
    const { params } = this.props
    loadGoogleMapsSdk(params, ({ googleMaps, error }) =>
      this.setState({ googleMaps, error })
    )
  }

  render () {
    const { googleMaps, error } = this.state
    const { render } = this.props
    return render(googleMaps, error)
  }
}

GoogleMapsLoader.propTypes = {
  params: PropTypes.shape({
    key: PropTypes.string.isRequired,
    libraries: PropTypes.string
  }).isRequired,
  render: PropTypes.func.isRequired
}

export default GoogleMapsLoader
