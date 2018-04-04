import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export class Form extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.props.onFormChange(event.target.name, event.target.value)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.onFormSubmit(event.target.name)
  }
  render() {
    return (
      <form name={this.props.name} onSubmit={this.handleSubmit}>
        <TextField
          name={this.props.name}
          hintText={this.props.hintText}
          value={this.props.value}
          onChange={this.handleChange}
        />
        <RaisedButton type="submit" label={this.props.btnText} primary={true} />
      </form>
    )
  }
}
