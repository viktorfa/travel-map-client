import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class TMImageCarousel extends Component {
  render() {
    const { images, handleImageClick, handleImageHover, focusedImage } = this.props
    console.log(images)
    return (
      <div
        className='gallery-image-grid'
      >
        {
          _.sortBy(images, image => image.timestamp.unix()).map(image => (
            <img
              className={`gallery-image ${focusedImage === image.id ? 'gallery-image-active' : ''}`}
              onClick={() => handleImageClick(image)}
              onMouseEnter={() => handleImageHover(image)}
              onMouseLeave={() => handleImageHover(null)}
              src={image.url}
              alt={'Piss'}
              key={image.id}
            />
          ))
        }
      </div>
    )
  }
}

TMImageCarousel.propTypes = {
  images: PropTypes.array.isRequired,
  handleImageClick: PropTypes.func.isRequired,
  handleImageHover: PropTypes.func.isRequired,
  focusedImage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default TMImageCarousel
