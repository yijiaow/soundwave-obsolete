import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { keyword: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({ keyword: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.search(this.state)
  }
  render() {
    return (
      <form name="keyword" onSubmit={this.handleSubmit}>
        <TextField
          name="keyword"
          hintText="What are you looking for?"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <RaisedButton type="submit" label="Go!" primary={true} />
      </form>
    )
  }
}
