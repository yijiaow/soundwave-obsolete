import React, { Component } from 'react'
import List from 'material-ui/List'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btn: {
    width: 84,
    height: 40,
    margin: 10,
    borderRadius: 15,
    border: `2px solid ${theme.palette.secondary.light}`,
    color: theme.palette.text.secondary,
    fontSize: 14,
    textTransform: 'capitalize',
    boxShadow: '0 0 25px'
  },
  selected: {
    backgroundColor: 'tomato'
  }
})
class Genres extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: -1,
      selectedKey: null,
      allGenres: [],
      searchResults: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.fetchGenres = this.fetchGenres.bind(this)
    this.fetchEventsByGenre = this.fetchEventsByGenre.bind(this)
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
  fetchEventsByGenre(id) {
    this.props.search({ classificationId: id })
  }
  render() {
    const { classes } = this.props
    return (
      <List className={classes.root}>
        {this.props.genres.map((genre, i) => (
          <Button
            focusRipple
            key={genre.id}
            className={`${classes.btn} ${
              this.state.selectedIndex === i ? classes.selected : ''
            }`}
            onClick={() => {
              this.handleChange(i, genre.id)
              this.fetchEventsByGenre(genre.id)
            }}
          >
            {genre.name}
          </Button>
        ))}
        <Button key="more" className={classes.btn} onClick={this.fetchGenres}>
          More
        </Button>
      </List>
    )
  }
}
export default withStyles(styles)(Genres)
