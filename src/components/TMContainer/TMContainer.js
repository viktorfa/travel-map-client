import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TMMap from '../../TMMap';
import { actions } from '.';
import { readImageInput } from './helpers'
import TMFullScreenImage from './TMFullScreenImage';
import TMImageCarousel from './TMImageCarousel';

class TMContainer extends Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleImageClick = this.handleImageClick.bind(this)
    this.handleImageHover = this.handleImageHover.bind(this)
    this.setFilteredImages = this.setFilteredImages.bind(this)
  }

  handleInputChange(event) {
    console.log('files')
    console.log(event.target.files)
    this.props.handleImageInput(event.target.files)
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

  setFilteredImages(images) {
    this.props.setFilteredImages(images)
  }

  render() {
    const { images, selectedImage, filteredImages, groupedImages, focusedImage } = this.props
    return (
      <div>
        <div>
          <input
            type='file'
            multiple
            accept='image/*'
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <button
            onClick={() => this.setFilteredImages([])}
          >
            Show all
          </button>
          {
            Object.entries(groupedImages).sort(([aKey, aValue], [bKey, bValue]) => aValue[0].timestamp.unix() - bValue[0].timestamp.unix()).map(([key, value]) => (
              <button
                key={key}
                onClick={() => this.setFilteredImages(value)}
              >{key}</button>
            ))
          }
        </div>
        {
          <TMMap
            images={filteredImages && filteredImages.length > 0 ? filteredImages : images}
            focusedImage={focusedImage}
            handleImageClick={this.handleImageClick}
            handleImageHover={this.handleImageHover}
            />
          }
        {
          selectedImage && (
            <TMFullScreenImage
              image={selectedImage}
              handleClick={this.handleImageClick}
              />
              )
            }
        <TMImageCarousel
          images={filteredImages && filteredImages.length > 0 ? filteredImages : images}
          focusedImage={focusedImage}
          handleImageClick={this.handleImageClick}
          handleImageHover={this.handleImageHover}
        />
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
  focusedImage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectedImage: PropTypes.object,
}

const mapStateToProps = (state) => ({
  images: state.tm.images,
  filteredImages: state.tm.filteredImages,
  selectedImage: state.tm.selectedImage,
  focusedImage: state.tm.focusedImage,
  groupedImages: state.tm.groupedImages,
})

const mapDispatchToProps = (dispatch) => ({
  handleImageInput: imageFiles => dispatch(handleImageInput(imageFiles)),
  handleImageClick: image => dispatch(handleImageClick(image)),
  handleImageHover: imageId => dispatch(setFocusImage(imageId)),
  setFilteredImages: images => dispatch(setFilteredImages(images)),
})
const handleImageInput = imageFiles => async dispatch => {
  const images = await readImageInput(imageFiles)
  dispatch(setImages(images))
}
const setImages = images => ({ type: actions.SET_IMAGES, payload: { images } })
const handleImageClick = image => ({ type: actions.CLICK_IMAGE, payload: { image } })
const setFilteredImages = images => ({ type: actions.SET_FILTERED_IMAGES, payload: { images } })
const setFocusImage = imageId => ({ type: actions.FOCUS_IMAGE, payload: { imageId } })

export default connect(mapStateToProps, mapDispatchToProps)(TMContainer)
