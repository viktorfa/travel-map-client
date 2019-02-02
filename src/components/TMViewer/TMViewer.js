import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'

import {handleImageClick, handleImageInput, setFilteredImages, setFocusImage} from './actionCreators'
import TMMap from './TMMap';
import TMFullScreenImage from './TMFullScreenImage';
import TMHorizontalImageList from './TMHorizontalImageList';

class TMContainer extends Component {
  constructor(props) {
    super(props)

    this.handleImageClick = this.handleImageClick.bind(this)
    this.handleImageHover = this.handleImageHover.bind(this)
    this.handleImageGroupClick = this.handleImageGroupClick.bind(this)
  }

  handleImageClick(image) {
    this.props.handleImageClick(image)
  }

  handleImageHover(image) {
    if (image && image.id) {
      this.props.handleImageHover(image.id)
    } else {
      this.props.handleImageHover(null)
    }
  }

  handleImageGroupClick(group) {
    if (group) {
      this.props.setFilteredImages(this.props.groupedImages[group], group)
    } else {
      this.props.setFilteredImages([])
    }
  }

  state = {}

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    const { images, selectedImage, filteredImages, groupedImages, focusedImage } = this.props
    const [mapHeight, imageListHeight] = [(window.innerHeight / 100) * 40, (window.innerHeight / 100) * 60]
    return (
      <div
        style={{position: 'fixed', top: 0, left: 0, width: `${window.innerWidth}px`}}
      >
        <div
          style={{height: `${mapHeight}px`}}
        >
          <TMMap
            images={filteredImages && filteredImages.length > 0 ? filteredImages : images}
            focusedImage={focusedImage}
            handleImageClick={this.handleImageClick}
            handleImageHover={this.handleImageHover}
            height={mapHeight}
            />
        </div>
        <div
          style={{height: `${imageListHeight}px`}}
        >
          <TMHorizontalImageList
            groupedImages={groupedImages}
            images={images}
            focusedImage={focusedImage}
            handleImageClick={this.handleImageClick}
            handleImageHover={this.handleImageHover}
            switchGroup={this.handleImageGroupClick}
            height={imageListHeight}
          />
        </div>
        {
          selectedImage && (
            <TMFullScreenImage
              image={selectedImage}
              handleClick={this.handleImageClick}
            />
          )
        }
      </div>
    )
  }
}

TMContainer.propTypes = {
  images: PropTypes.array.isRequired,
  groupedImages: PropTypes.object.isRequired,
  filteredImages: PropTypes.array.isRequired,
  handleImageInput: PropTypes.func.isRequired,
  handleImageClick: PropTypes.func.isRequired,
  setFilteredImages: PropTypes.func.isRequired,
  selectedGroup: PropTypes.string,
  focusedImage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectedImage: PropTypes.object,
}


const mapStateToProps = (state) => ({
  images: state.tmv.images,
  filteredImages: state.tmv.filteredImages,
  selectedImage: state.tmv.selectedImage,
  selectedGroup: state.tmv.selectedGroup,
  focusedImage: state.tmv.focusedImage,
  groupedImages: state.tmv.groupedImages,
})

const mapDispatchToProps = (dispatch) => ({
  handleImageInput: imageFiles => dispatch(handleImageInput(imageFiles)),
  handleImageClick: image => dispatch(handleImageClick(image)),
  handleImageHover: imageId => dispatch(setFocusImage(imageId)),
  setFilteredImages: (images, group) => dispatch(setFilteredImages(images, group)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TMContainer)
