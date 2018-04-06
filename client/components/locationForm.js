import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { location: '' }
    this.handleClick = this.handleClick.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleClick(event) {
    event.preventDefault()
    this.props.onDropdown(event.currentTarget)
  }
  handleRequestClose() {
    this.props.onDropdownClose()
  }
  handleChange(event) {
    this.setState({ location: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.updateLocation(this.state)
  }
  render() {
    return (
      <div>
        <FlatButton
          onClick={this.handleClick}
          label="Greater Los Angeles Area"
        />
        <Popover
          open={this.props.status}
          anchorEl={this.props.anchor}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          animation={PopoverAnimationVertical}
        >
          <form name="location" onSubmit={this.handleSubmit}>
            <TextField
              name="location"
              hintText="Enter City or Zipcode"
              value={this.state.location}
              onChange={this.handleChange}
            />
            <RaisedButton type="submit" label="Change" primary={true} />
          </form>
        </Popover>
      </div>
    )
  }
}
