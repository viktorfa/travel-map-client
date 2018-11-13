import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import config from '../../config'
import { getRectangleFromPositions } from '../../map-utils'

const MyMap = withScriptjs(withGoogleMap((props) => {
  const { images, handleImageClick, handleImageHover, focusedImage } = props
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 60, lng: 10 }}
      ref={props.handleMapMounted}
    >
      {
        images.map(imageObject => (
          <Marker
            position={imageObject.position}
            onClick={() => handleImageClick(imageObject)}
            onMouseOver={() => handleImageHover(imageObject)}
            onMouseLeave={handleImageHover}
            key={imageObject.id}
            labelAnchor={new window.google.maps.Point(0, 0)}
            opacity={focusedImage === imageObject.id ? 1 : .4}
          />
        ))
      }
    </GoogleMap>
  )
}
))
class TMMap extends Component {
  constructor(props) {
    super(props)
    this.handleMapMounted = this.handleMapMounted.bind(this)
  }

  componentDidUpdate({ images: oldImages }) {
    const shouldRefitMap = this.map && !_.isEqual(oldImages.map(({ id }) => id), this.props.images.map(({ id }) => id))
    if (shouldRefitMap) {
      this.map.fitBounds(getRectangleFromPositions(this.props.images.map(image => image.position)))
    }
  }

  handleMapMounted(map) {
    this.map = map
    this.map.fitBounds(getRectangleFromPositions(this.props.images.map(image => image.position)))
  }

  render() {
    const { images, handleImageClick, handleImageHover, focusedImage } = this.props
    const size = { width: window.innerWidth / 3, height: window.innerHeight }

    return (
      <MyMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.googleMapsApiKey}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: size.height }} />}
        mapElement={<div style={{ height: `100%` }} />}
        handleMapMounted={this.handleMapMounted}
        handleImageHover={handleImageHover}
        handleImageClick={handleImageClick}
        focusedImage={focusedImage}
        images={images}
      />
    )
  }
}

TMMap.propTypes = {
  images: PropTypes.array.isRequired,
  focusedImage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleImageClick: PropTypes.func.isRequired,
  handleImageHover: PropTypes.func.isRequired,
}

export default TMMap
