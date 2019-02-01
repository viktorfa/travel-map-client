import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Waypoint from 'react-waypoint'
import {Image} from 'semantic-ui-react'

import './TMHorizontalImageList.css'

class TMHorizontalImageList extends Component {
  constructor(props) {
    super(props)

    this.handleGroupSwitch = this.handleGroupSwitch.bind(this)
    this.handleImageFocus = this.handleImageFocus.bind(this)
  }
  handleGroupSwitch(group) {
    this.props.switchGroup(group)
  }

  handleImageFocus(id) {
    console.log(`focus: ${id}`)
    this.props.handleImageHover({id})
  }

  render() {
    const { images, handleImageClick, handleImageHover, focusedImage } = this.props
    return (
      <div
        className='horizontal-scroll-image-list'
        onSwipe={() => console.log('swipe')}
      >
        {
          images.map(({url, title, id, timestamp}) => (
            <Waypoint
              onEnter={() => this.handleImageFocus(id)}
              onLeave={() => console.log(`Leave: ${id}`)}
              key={id}
              horizontal={true}
            >
            <div
              className='horizontal-scroll-image-box'
            >
              <p className="horizontal-scroll-image-header">{timestamp.format('MMM DD')}</p>
              <Image 
                className='horizontal-scroll-image'
                src={url}
                alt={title}
              />
            </div>
            </Waypoint>
          ))
        }
      </div>
    )
  }
}


TMHorizontalImageList.propTypes = {
  groupedImages: PropTypes.object.isRequired,
  handleImageClick: PropTypes.func.isRequired,
  handleImageHover: PropTypes.func.isRequired,
  switchGroup: PropTypes.func.isRequired,
  focusedImage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default TMHorizontalImageList
