import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Grid, Sticky } from 'semantic-ui-react'

import {handleImageClick, handleImageInput, setFilteredImages, setFocusImage} from './actionCreators'
import TMMap from './TMMap';
import TMFullScreenImage from './TMFullScreenImage';
import TMScrollableImageList from './TMScrollableImageList';
import TMGroupButtons from './TMGroupButtons';

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
    const { images, selectedImage, filteredImages, groupedImages, focusedImage, selectedGroup } = this.props
    return (
      <div>
        <Grid
          columns={2}
          stackable
        >
          <Grid.Column
            width={10}
          >
            <div ref={this.handleContextRef}>
              <Grid.Row>
                <TMScrollableImageList
                  groupedImages={groupedImages}
                  focusedImage={focusedImage}
                  handleImageClick={this.handleImageClick}
                  handleImageHover={this.handleImageHover}
                  switchGroup={this.handleImageGroupClick}
                />
              </Grid.Row>
            </div>
          </Grid.Column>
          <Grid.Column
            width={6}
          >
            <Sticky context={this.state.contextRef}>
              <TMGroupButtons
                groups={_.sortBy(Object.entries(groupedImages), ([key, value]) => value[0].timestamp.unix()).map(([key, value]) => key)}
                handleClick={this.handleImageGroupClick}
                selectedGroup={selectedGroup}
              />
              <TMMap
                images={filteredImages && filteredImages.length > 0 ? filteredImages : images}
                focusedImage={focusedImage}
                handleImageClick={this.handleImageClick}
                handleImageHover={this.handleImageHover}
              />
            </Sticky>
          </Grid.Column>
        </Grid>
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
