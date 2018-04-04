import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'

import { Form } from './form.js'
import { FormDropdown } from './dropdown.js'
import { Events } from './events.js'

const serialize = obj => {
  const queries = []
  for (let [key, value] of Object.entries(obj)) {
    queries.push(key.concat('=', encodeURI(value)))
  }
  return queries.join('&')
}

export class Controller extends Component {
  constructor(props) {
    super(props)
    this.state = {
      params: { keyword: '', location: 'Los Angeles' },
      searchResults: [],
      dropdownStatus: { open: false }
    }
    this.handleDropdown = this.handleDropdown.bind(this)
    this.handleDropdownClose = this.handleDropdownClose.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.fetchEvents = this.fetchEvents.bind(this)
  }
  handleDropdown(anchor) {
    this.setState({ dropdownStatus: { open: true, anchorEl: anchor } })
  }
  handleDropdownClose() {
    this.setState({ dropdownStatus: { open: false } })
  }
  handleFormChange(name, value) {
    const paramsCopy = JSON.parse(JSON.stringify(this.state.params))
    paramsCopy[name] = value
    this.setState({ params: paramsCopy })
  }
  handleFormSubmit(name) {
    if (name === 'keyword') {
      this.fetchEvents(serialize(this.state.params))
    }
  }
  fetchEvents(queryString) {
    fetch(`/events/search?${queryString}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ searchResults: data.events })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <div>
        <AppBar title="SoundWave">
          <Form
            name="keyword"
            hintText="What are you looking for?"
            btnText="Go!"
            value={this.state.params.keyword}
            onFormChange={this.handleFormChange}
            onFormSubmit={this.handleFormSubmit}
          />
          <FormDropdown
            status={this.state.dropdownStatus.open}
            anchor={this.state.dropdownStatus.anchorEl}
            onDropdown={this.handleDropdown}
            onDropdownClose={this.handleDropdownClose}
            onFormChange={this.handleFormChange}
          />
        </AppBar>
        <Events events={this.state.searchResults} />
      </div>
    )
  }
}
