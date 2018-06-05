import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 360,
    height: 300,
    padding: 30,
    borderRadius: 30
  },
  button: {
    margin: '24px 0'
  }
}
class SigninForm extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', loginStatus: false }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    const { email, password } = this.state
    fetch('/signin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(user => {
        this.setState({ email: '', password: '', loginStatus: true, user })
      })
      .catch(err => console.error(err))
  }
  render() {
    const { classes } = this.props
    return (
      <form
        autoComplete="off"
        className={classes.container}
        onSubmit={this.handleSubmit}
      >
        <TextField
          required
          name="email"
          id="email"
          label="Email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <TextField
          required
          name="password"
          id="password"
          label="Password"
          type="password"
        />
        <Button
          className={classes.button}
          type="submit"
          color="primary"
          size="large"
          variant="contained"
        >
          Sign In
        </Button>
      </form>
    )
  }
}

export default withStyles(styles)(SigninForm)
