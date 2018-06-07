import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Popover, { PopoverAnimationVertical } from '@material-ui/core/Popover'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    color: 'red'
  },
  dropdown: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    borderRadius: 20
  },
  button: {
    marginTop: 20,
    borderRadius: 20
  },
  location: {
    color: 'white'
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
    this.resetForm = this.resetForm.bind(this)
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
    const { city, state, zipcode } = this.state
    this.props.updateLocation({ city, state, zipcode })
    this.resetForm(event.target)
  }
  resetForm(form) {
    this.setState({
      city: '',
      state: '',
      zipcode: '',
      dropdownStatus: { open: false, anchorEl: null }
    })
  }
  render() {
    const { classes } = this.props
    const { open, anchorEl } = this.state.dropdownStatus
    const location = this.props.currentLocation
    const stateString = location.state && `, ${location.state}`
    return (
      <div>
        <Button onClick={this.handleOpen}>
          <Typography variant="title" color="textSecondary">{`${
            location.city
          } ${stateString}  ${location.zipcode}`}</Typography>
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
            id="locationForm"
            noValidate
            autoComplete="off"
            className={classes.dropdown}
            onSubmit={this.handleSubmit}
          >
            <TextField
              name="city"
              label="City"
              value={this.state.city}
              onChange={this.handleChange}
            />
            <TextField
              name="state"
              label="State"
              value={this.state.state}
              onChange={this.handleChange}
            />
            <TextField
              name="zipcode"
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
