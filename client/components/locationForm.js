import React, { Component } from 'react'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import TextField from 'material-ui/TextField'

const styles = {
  dropdown: {
    borderRadius: 10,
    boxShadow: '0 10 10'
  }
}
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
      dropdownOpen: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleOpen(event) {
    event.preventDefault()
    this.setState({ dropdownOpen: true })
  }
  handleClose() {
    this.setState({ dropdownOpen: false })
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
      <Tooltip
        enterDelay={300}
        leaveDelay={300}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        open={this.state.dropdownOpen}
        placement="bottom"
        title={
          <form
            style={styles.dropdown}
            name="location"
            onSubmit={this.handleSubmit}
          >
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
        }
      >
        <Button variant="flat" onMouseOver={this.handleOpen}>
          Los Angeles
        </Button>
      </Tooltip>
    )
  }
}
