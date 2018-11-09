import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TMFullScreenImage extends Component {
  render() {
    const { image, handleClick } = this.props
    return (
      <div
        onClick={() => handleClick(image)}
        style={{
          position: 'fixed',
          top: 0,
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(20, 20, 20, .8)',
        }}
      >
        <span
          style={{
            color: 'white',
          }}
        >{image.timestamp.format('MMM DD YYYY')}</span>
        <img
          alt={'Rass'}
          id={'fullscreen-image'}
          src={image.url}
          style={{
            maxHeight: '100vh',
            maxWidth: '100vw',
          }}
        />
      </div>
    )
  }
}

TMFullScreenImage.propTypes = {
  image: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default TMFullScreenImage
