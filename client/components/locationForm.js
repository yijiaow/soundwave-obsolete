import React, { Component } from 'react'
import Button from 'material-ui/Button'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import TextField from 'material-ui/TextField'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
      dropdownStatus: { open: false, anchorEl: null }
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleOpen(event) {
    event.preventDefault()
    this.setState({ dropdownStatus: { open: true, anchorEl: event.target } })
  }
  handleClose() {
    this.setState({ dropdownStatus: { open: false, anchorEl: null } })
  }
  handleChange(event) {
    this.setState({ location: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.updateLocation(this.state)
  }
  render() {
    const { open, anchorEl } = this.state.dropdownStatus
    return (
      <div>
        <Button color="secondary" variant="flat" onMouseOver={this.handleOpen}>
          Los Angeles
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          onClose={this.handleClose}
          animation={PopoverAnimationVertical}
        >
          <form name="location" onSubmit={this.handleSubmit}>
            <TextField
              id="location"
              placeholder="Enter City or Zipcode"
              value={this.state.location}
              onChange={this.handleChange}
            />
            <Button type="submit" color="primary" variant="raised">
              Change
            </Button>
          </form>
        </Popover>
      </div>
    )
  }
}
