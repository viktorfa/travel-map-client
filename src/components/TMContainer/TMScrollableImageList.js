import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Waypoint from 'react-waypoint'

class TMScrollableImageList extends Component {
  constructor(props) {
    super(props)

    this.handleGroupSwitch = this.handleGroupSwitch.bind(this)
  }
  handleGroupSwitch(group) {
    this.props.switchGroup(group)
  }

  render() {
    const { groupedImages, handleImageClick, handleImageHover, focusedImage } = this.props
    return (
      <div>
        {
          _.sortBy(Object.entries(groupedImages), ([key, images]) => images[0].timestamp.unix()).map(([key, images]) => (
            <Waypoint
              onEnter={() => this.handleGroupSwitch(key)}
              onLeave={() => console.log(`Leave: ${key}`)}
              key={key}
            >
              <TMImageGroup
                header={key}
                images={images}
                handleImageClick={handleImageClick}
                handleImageHover={handleImageHover}
                focusedImage={focusedImage}
              />
            </Waypoint>
          ))
        }
      </div>
    )
  }
}

TMScrollableImageList.propTypes = {
  groupedImages: PropTypes.object.isRequired,
  handleImageClick: PropTypes.func.isRequired,
  handleImageHover: PropTypes.func.isRequired,
  switchGroup: PropTypes.func.isRequired,
  focusedImage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

const TMImageGroup = ({ images, header, handleImageClick, handleImageHover, focusedImage, innerRef }) => (
  <div
    ref={innerRef}
  >
    <h2>{header}</h2>
    <div
      className='gallery-image-grid'
    >
      {
        images.map(image => (
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
  </div>
)

export default TMScrollableImageList
