import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { handleImageFileInput, loadFirestoreImages, loadImagesToMap } from './actionCreators'
import TMCreatorImage from './TMCreatorImage'

class TMCreator extends Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.loadImagesToMap = this.loadImagesToMap.bind(this)
  }
  handleInputChange(event) {
    this.props.handleImageFileInput(event.target.files)
  }
  loadImagesToMap() {
    this.props.loadImagesToMap()
  }

  componentDidMount() {
    if (this.props.images.length === 0) {
      this.props.loadFirestoreImages()
    }
  }

  render() {
    const {images} = this.props
    return (
      <div>
        <h1>TMCreator</h1>
        <Button onClick={this.loadImagesToMap}>Load to map</Button>
        <div>
          <input
            type='file'
            multiple
            accept='image/*'
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          {images.map((image) => (
            <TMCreatorImage image={image} key={image.id} />
          ))}
        </div>
      </div>
    )
  }
}

TMCreator.propTypes = {
 images: PropTypes.array.isRequired,
}


const mapStateToProps = (state) => ({
  images: state.tmc.images,
})

const mapDispatchToProps = (dispatch) => ({
  handleImageFileInput: (files) => dispatch(handleImageFileInput(files)),
  loadFirestoreImages: () => dispatch(loadFirestoreImages()),
  loadImagesToMap: () => dispatch(loadImagesToMap()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TMCreator)
