import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'

import TMMap from '../../TMMap';
import { actions } from '.';
import { readImageInput } from './helpers'
import TMFullScreenImage from './TMFullScreenImage';
import TMImageCarousel from './TMImageCarousel';
import TMGroupButtons from './TMGroupButtons';

class TMContainer extends Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleImageClick = this.handleImageClick.bind(this)
    this.handleImageHover = this.handleImageHover.bind(this)
    this.handleImageGroupClick = this.handleImageGroupClick.bind(this)
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

  handleImageGroupClick(group) {
    if (group) {
      this.props.setFilteredImages(this.props.groupedImages[group], group)
    } else {
      this.props.setFilteredImages([])
    }
  }

  render() {
    const { images, selectedImage, filteredImages, groupedImages, focusedImage, selectedGroup } = this.props
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
          <TMGroupButtons
            groups={_.sortBy(Object.entries(groupedImages), ([key, value]) => value[0].timestamp.unix()).map(([key, value]) => key)}
            handleClick={this.handleImageGroupClick}
            selectedGroup={selectedGroup}
          />
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
  selectedGroup: PropTypes.string,
  focusedImage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectedImage: PropTypes.object,
}


const mapStateToProps = (state) => ({
  images: state.tm.images,
  filteredImages: state.tm.filteredImages,
  selectedImage: state.tm.selectedImage,
  selectedGroup: state.tm.selectedGroup,
  focusedImage: state.tm.focusedImage,
  groupedImages: state.tm.groupedImages,
})

const mapDispatchToProps = (dispatch) => ({
  handleImageInput: imageFiles => dispatch(handleImageInput(imageFiles)),
  handleImageClick: image => dispatch(handleImageClick(image)),
  handleImageHover: imageId => dispatch(setFocusImage(imageId)),
  setFilteredImages: (images, group) => dispatch(setFilteredImages(images, group)),
})
const handleImageInput = imageFiles => async dispatch => {
  const images = await readImageInput(imageFiles)
  dispatch(setImages(images))
}
const setImages = images => ({ type: actions.SET_IMAGES, payload: { images } })
const handleImageClick = image => ({ type: actions.CLICK_IMAGE, payload: { image } })
const setFilteredImages = (images, group) => ({ type: actions.SET_FILTERED_IMAGES, payload: { images, group } })
const setFocusImage = imageId => ({ type: actions.FOCUS_IMAGE, payload: { imageId } })

export default connect(mapStateToProps, mapDispatchToProps)(TMContainer)
