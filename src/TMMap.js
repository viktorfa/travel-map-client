import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import config from './config'
import { getRectangleFromPositions } from './map-utils'

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
            key={imageObject.id}
            position={imageObject.position}
            image={imageObject}
            focus={imageObject.id === focusedImage}
            onClick={() => handleImageClick(imageObject)}
            onMouseOver={() => handleImageHover(imageObject)}
            onMouseLeave={handleImageHover}
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

  componentDidUpdate() {
    console.log('componentDidUpdate')
    if (this.map) {
      this.map.fitBounds(getRectangleFromPositions(this.props.images.map(image => image.position)))
    }
  }

  handleMapMounted(map) {
    console.log('handleMapMounted')
    console.log(map)

    this.map = map
    this.map.fitBounds(getRectangleFromPositions(this.props.images.map(image => image.position)))
  }

  render() {
    const { images, handleImageClick, handleImageHover } = this.props
    const size = { width: window.innerWidth / 3, height: window.innerHeight }
    //const { center, zoom } = fitBounds(getRectangleFromPositions(images.map(image => image.position)), size)

    return (
      <MyMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.googleMapsApiKey}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: size.height }} />}
        mapElement={<div style={{ height: `100%` }} />}
        handleMapMounted={this.handleMapMounted}
        handleImageHover={handleImageHover}
        handleImageClick={handleImageClick}
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

class TMMarker extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleClick() {
    this.props.handleClick(this.props.image)
  }
  handleMouseOver() {
    this.props.handleMouseOver(this.props.image)
  }
  handleMouseLeave() {
    this.props.handleMouseLeave()
  }

  render() {
    return (
      <img
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        src={this.props.image.url}
        alt={'Piss'}
        style={{
          width: this.props.focus ? '128px' : '64px',
        }}
        onClick={this.handleClick}
      />
    )
  }
}

TMMarker.propTypes = {
  image: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  focus: PropTypes.bool,
}

export default TMMap
