import React, { Component } from 'react'
import Button from 'material-ui/Button'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'

const styles = {
  dropdown: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    borderRadius: 20
  },
  button: {
    marginTop: 20,
    borderRadius: 20
  }
}
export class LocationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      state: '',
      zipcode: '',
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
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.updateLocation(this.state)
  }
  render() {
    const { classes } = this.props
    const { open, anchorEl } = this.state.dropdownStatus
    return (
      <div>
        <Button variant="flat" onMouseOver={this.handleOpen}>
          Los Angeles
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          onClose={this.handleClose}
          animation={PopoverAnimationVertical}
          elevation={16}
          transitionDuration={1000}
        >
          <form
            noValidate
            autoComplete="off"
            className={classes.dropdown}
            onSubmit={this.handleSubmit}
          >
            <TextField
              id="city"
              label="City"
              value={this.state.city}
              onChange={this.handleChange}
            />
            <TextField
              id="state"
              label="State"
              value={this.state.state}
              onChange={this.handleChange}
            />
            <TextField
              id="zipcode"
              label="Zip Code"
              value={this.state.zipcode}
              onChange={this.handleChange}
            />
            <Button
              className={classes.button}
              type="submit"
              color="primary"
              variant="raised"
            >
              Change
            </Button>
          </form>
        </Popover>
      </div>
    )
  }
}

export default withStyles(styles)(LocationForm)
