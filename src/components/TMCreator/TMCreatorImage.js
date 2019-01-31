import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { Button, Grid, Input, Image } from 'semantic-ui-react'


class TMCreatorImage extends Component {
  constructor(props) {
    super(props)

    this.state = {isEdited: false, ...props.image, timestamp: props.image.timestamp.toDate()}

    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handlePositionChange = this.handlePositionChange.bind(this)
    this.handleClickSave = this.handleClickSave.bind(this)
  }

  handleDateChange(newDate, event) {
    console.log('date change')
    console.log(newDate)
    console.log(event)
    this.setState({isEdited: true, timestamp: newDate})
  }
  handleTitleChange(event, {value}, dick) {
    this.setState({isEdited: true, title: value})
  }
  handlePositionChange() {
    this.setState({isEdited: true})
  }
  
  handleClickSave() {
    this.setState({isEdited: false})
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
            value={this.state.title} 
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
            value={_.get(this.state, 'position.lat', 0)} 
            label='latitude' 
            onChange={this.handlePositionChange} 
            fluid 
            /> 
          <Input 
            type="number" 
            value={_.get(this.state, 'position.lng', 0)} 
            label='longitude' 
            onChange={this.handlePositionChange} 
            fluid 
          /> 
          <Button 
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
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TMCreatorImage)
