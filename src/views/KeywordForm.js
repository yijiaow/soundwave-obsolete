import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    width: '40%',
    minWidth: 300
  },
  input: {
    width: '80%',
    textAlign: 'center'
  }
}
export class KeywordForm extends Component {
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
    const { classes } = this.props
    return (
      <form
        autoComplete="off"
        className={classes.root}
        name="keyword"
        onSubmit={this.handleSubmit}
      >
        <TextField
          className={classes.input}
          id="keyword"
          placeholder="What are you looking for?"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <Button type="submit" color="secondary" variant="fab">
          Go!
        </Button>
      </form>
    )
  }
}

export default withStyles(styles)(KeywordForm)
