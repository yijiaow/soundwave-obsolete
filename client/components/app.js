import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'

import KeywordForm from './keywordForm.js'
import LocationForm from './locationForm.js'
import { Events } from './events.js'
import { Carousel } from './carousel.js'
import { Genres } from './genres.js'

import festivals from '../../data/festivals.js'
import genres from '../../data/genres.js'

const serialize = obj => {
  const queries = []
  for (let [key, value] of Object.entries(obj)) {
    queries.push(key.concat('=', encodeURI(value)))
  }
  return queries.join('&')
}

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      params: { city: 'Los Angeles' },
      searchResults: [],
      dropdownStatus: { open: false }
    }
    this.handleDropdown = this.handleDropdown.bind(this)
    this.handleDropdownClose = this.handleDropdownClose.bind(this)
    this.handleLocationUpdate = this.handleLocationUpdate.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  handleDropdown(anchor) {
    this.setState({ dropdownStatus: { open: true, anchorEl: anchor } })
  }
  handleDropdownClose() {
    this.setState({ dropdownStatus: { open: false } })
  }
  handleLocationUpdate(location) {
    this.setState({ params: location })
  }
  handleSearch(params) {
    const merged = Object.assign(params, this.state.params)
    const queryString = serialize(merged)
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
    const searchResults = this.state.searchResults
    return (
      <div>
        <AppBar title="SoundWave">
          <KeywordForm search={this.handleSearch} />
          <LocationForm
            updateLocation={this.handleLocationUpdate}
            onDropdown={this.handleDropdown}
            onDropdownClose={this.handleDropdownClose}
            status={this.state.dropdownStatus.open}
            anchor={this.state.dropdownStatus.anchorEl}
          />
        </AppBar>
        <Genres genres={genres} search={this.handleSearch} />
        <Carousel
          festivals={festivals}
          renderStatus={searchResults.length <= 0}
        />
        <Events
          events={searchResults}
          renderStatus={searchResults.length > 0}
        />
      </div>
    )
  }
}
