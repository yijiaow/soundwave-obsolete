import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  circle: {
    width: 100,
    height: 100,
    margin: 20,
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: 'silver'
  },
  selected: {
    width: 100,
    height: 100,
    margin: 20,
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: 'tomato'
  }
}
export class Genres extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedIndex: -1, selectedKey: null }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(index, key) {
    this.setState({ selectedIndex: index, selectedKey: key })
  }
  render() {
    return (
      <List style={styles.root}>
        {this.props.genres.map((genre, i) => (
          <ListItem
            key={genre.id}
            primaryText={genre.name}
            style={
              this.state.selectedIndex === i ? styles.selected : styles.circle
            }
            onClick={() => this.handleChange(i, genre.id)}
          />
        ))}
      </List>
    )
  }
}
