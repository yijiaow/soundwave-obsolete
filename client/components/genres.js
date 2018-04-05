import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  circle: {
    width: 85,
    height: 85,
    margin: 10,
    textAlign: 'center',
    fontSize: 14,
    borderRadius: 40,
    backgroundColor: 'silver'
  },
  selected: {
    width: 85,
    height: 85,
    margin: 10,
    textAlign: 'center',
    fontSize: 14,
    borderRadius: 40,
    backgroundColor: 'tomato'
  }
}
export class Genres extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedIndex: -1, selectedKey: null, allGenres: [] }
    this.handleChange = this.handleChange.bind(this)
    this.fetchGenres = this.fetchGenres.bind(this)
  }
  handleChange(index, key) {
    this.setState({ selectedIndex: index, selectedKey: key })
  }
  fetchGenres() {
    fetch('/genres/all')
      .then(res => res.json())
      .then(data => {
        this.setState({ allGenres: data })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <List style={styles.root}>
        {this.props.genres.map((genre, i) => (
          <ListItem
            key={genre.id}
            style={
              this.state.selectedIndex === i ? styles.selected : styles.circle
            }
            onClick={() => this.handleChange(i, genre.id)}
          >
            <p>{genre.name}</p>
          </ListItem>
        ))}
        <ListItem key="more" style={styles.circle} onClick={this.fetchGenres}>
          <p>More genres</p>
        </ListItem>
      </List>
    )
  }
}
