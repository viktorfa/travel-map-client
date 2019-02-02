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
    console.log(`Enter: ${group}`)
    this.props.switchGroup(group)
  }

  handleImageFocus(id) {
    console.log(`focus: ${id}`)
    this.props.handleImageHover({id})
  }

  render() {
    const { handleImageClick, groupedImages, height } = this.props
    return (
      <div
        className='horizontal-scroll-image-list'
      >
        {
          _.sortBy(Object.entries(groupedImages), ([key, images]) => images[0].timestamp.unix()).map(([key, images]) => (
            <Waypoint
              onEnter={() => this.handleGroupSwitch(key)}
              onLeave={() => console.log(`Leave: ${images[0].timestamp}`)}
              key={key}
              horizontal={true}
            >
              <div
                className='horizontal-scroll-image-group'
              >
                <h2 className="horizontal-scroll-image-header">{images[0].timestamp.format('MMM DD')}</h2>
                {
                  images.map((image) => (
                    <div
                      className='horizontal-scroll-image-box'
                      key={image.id}
                      >
                      <p
                      style={{
                        height: (height / 100) * 10,
                      }}
                      >{image.title}</p>
                      <Image 
                        style={{
                          height: (height / 100) * 85,
                        }}
                        className='horizontal-scroll-image'
                        src={image.url}
                        alt={image.title}
                        onClick={() => handleImageClick(image)}
                      />
                    </div>
                  ))
                }
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
  switchGroup: PropTypes.func.isRequired,
  height: PropTypes.number,
}
TMHorizontalImageList.defaultProps = {
  height: (window.innerHeight / 100) * 50,
}

export default TMHorizontalImageList
