import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class TMImageCarousel extends Component {
  render() {
    const { images, handleImageClick, handleImageHover } = this.props
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {
          _.sortBy(images, image => image.timestamp.unix()).map(image => (
            <img
              onClick={() => handleImageClick(image)}
              onMouseEnter={() => handleImageHover(image)}
              onMouseLeave={() => handleImageHover(null)}
              src={image.url}
              alt={'Piss'}
              key={image.id}
              style={{
                maxHeight: '256px',
              }}
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
