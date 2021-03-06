import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import {googleMapsApiKey} from '../../config/vars'
import { getRectangleFromPositions } from '../../map-utils'

const MyMap = withScriptjs(withGoogleMap((props) => {
  const { images, handleImageClick, handleImageHover, focusedImage } = props
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 60, lng: 10 }}
      defaultOptions={{disableDefaultUI: true}}
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
    if (map) {
      this.map = map
      this.map.fitBounds(getRectangleFromPositions(this.props.images.map(image => image.position)))
    } 
  }

  render() {
    const { images, handleImageClick, handleImageHover, focusedImage } = this.props
    const size = { width: this.props.width, height: this.props.height }

    return (
      <MyMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleMapsApiKey}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ ...size }} />}
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
  height: PropTypes.number,
  width: PropTypes.number,
}
TMMap.defaultProps = {
  height: (window.innerHeight / 100) * 40,
  width: window.innerWidth,
}

export default TMMap
