import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Grid, Input, Image } from 'semantic-ui-react'
import moment from 'moment'

import {editImage} from './actionCreators'


class TMCreatorImage extends Component {
  constructor(props) {
    super(props)

    this.state = {isEdited: false, image: {...props.image}, timestamp: props.image.timestamp.toDate()}

    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handlePositionChange = this.handlePositionChange.bind(this)
    this.handleClickSave = this.handleClickSave.bind(this)
  }

  handleDateChange(newDate) {
    this.setState({
      isEdited: true, 
      image: {
        ...this.state.image, 
        timestamp: moment(newDate),
      },
      timestamp: newDate,
    })
  }
  handleTitleChange(event, {value}) {
    this.setState({isEdited: true, image: {...this.state.image, title: value}})
  }
  handlePositionChange(event, {value, name}) {
    this.setState({
      isEdited: true,
      image: {
        ...this.state.image,
        position: {
          ...this.state.image.position,
          [name]: parseFloat(value),
        },
      },
    })
  }
  
  handleClickSave() {
    this.setState({isEdited: false})
    this.props.editImage(this.state.image)
  }

  render() {
    const {image} = this.props
    return (
      <Grid columns={2}>
        <Grid.Column textAlign='right'>
          <Image src={image.url} alt="Uploaded" width={Math.min(512, window.innerWidth || 512)} />
        </Grid.Column>
        <Grid.Column textAlign='left'>
          <Input 
            type="text" 
            value={this.state.image.title} 
            label='title' 
            onChange={this.handleTitleChange} 
            fluid 
          />
          <DatePicker 
            selected={this.state.timestamp} 
            onChange={this.handleDateChange} 
            label='date' 
            fluid
            />
          <Input 
            type="number"
            name='lat'
            value={_.get(this.state.image, 'position.lat', 0)} 
            label='latitude' 
            onChange={this.handlePositionChange} 
            fluid 
            /> 
          <Input 
            type="number" 
            name='lng'
            value={_.get(this.state.image, 'position.lng', 0)} 
            label='longitude' 
            onChange={this.handlePositionChange} 
            fluid 
          /> 
          <Button 
            color='blue'
            style={{visibility: this.state.isEdited ? 'visible' : 'hidden'}}
            onClick={this.handleClickSave}
          >Save</Button>
        </Grid.Column>
      </Grid>
    )
  }
}

TMCreatorImage.propTypes = {
 image: PropTypes.object.isRequired,
 editImage: PropTypes.func.isRequired,
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  editImage: (newImage) => dispatch(editImage(newImage))
})

export default connect(mapStateToProps, mapDispatchToProps)(TMCreatorImage)
