import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'

import { Form } from './form.js'

export class FormDropdown extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }
  handleClick(event) {
    event.preventDefault()
    this.props.onDropdown(event.currentTarget)
  }
  handleRequestClose() {
    this.props.onDropdownClose()
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
          <Form
            name="location"
            hintText="Enter City of Zipcode"
            btnText="Change"
            onFormChange={this.props.onFormChange}
          />
        </Popover>
      </div>
    )
  }
}
