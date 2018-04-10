import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import KeywordForm from './keywordForm.js'
import LocationForm from './locationForm.js'
import Events from './events.js'
import Carousel from './carousel.js'
import Genres from './genres.js'

import festivals from '../../data/festivals.js'
import genres from '../../data/genres.js'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 80,
    padding: '10px 40px'
  },
  searchBar: {
    width: 150
  }
}
const serialize = obj => {
  const queries = []
  for (let [key, value] of Object.entries(obj)) {
    queries.push(key.concat('=', encodeURI(value)))
  }
  return queries.join('&')
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      params: { city: 'Los Angeles' },
      searchResults: []
    }
    this.handleLocationUpdate = this.handleLocationUpdate.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
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
    const { classes } = this.props
    const searchResults = this.state.searchResults
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Typography variant="display2">SoundWave</Typography>
          <KeywordForm search={this.handleSearch} />
          <LocationForm updateLocation={this.handleLocationUpdate} />
        </AppBar>
        <Genres genres={genres} />
        <Events
          events={searchResults}
          renderStatus={searchResults.length > 0}
        />
      </div>
    )
  }
}

export default withStyles(styles)(App)
