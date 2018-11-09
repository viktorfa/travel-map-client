import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import GoogleMapReact from 'google-map-react'

import config from './config'
import { getGeoCenter } from './map-utils'

const TMMap = ({ images, handleImageClick, handleImageHover, focusedImage }) => (
  <div
    style={{ height: '512px' }}
  >
    <GoogleMapReact
      bootstrapURLKeys={{ key: config.googleMapsApiKey }}
      defaultZoom={10}
      defaultCenter={images && images.length > 0 ? getGeoCenter(images) : { lat: 60, lng: 10 }}
      center={getGeoCenter(images)}
    >
      {
        _.sortBy(images, image => image.id === focusedImage).map(imageObject => (
          <TMMarker
            key={imageObject.id}
            lng={imageObject.position.lng}
            lat={imageObject.position.lat}
            image={imageObject}
            focus={imageObject.id === focusedImage}
            handleClick={handleImageClick}
            handleMouseOver={handleImageHover}
            handleMouseLeave={handleImageHover}
          />
        ))
      }
    </GoogleMapReact>
  </div>
)

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
