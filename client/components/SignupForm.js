import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    height: 300
  }
}

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', confirmPassword: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    const { email, password } = this.state
    fetch('/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(() => {
        this.setState({ email: '', password: '', confirmPassword: '' })
      })
      .catch(err => console.error(err))
  }
  render() {
    const { classes } = this.props
    return (
      <form
        id="signup"
        autoComplete="off"
        noValidate
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
          value={this.state.password}
          onChange={this.handleChange}
        />
        <TextField
          required
          name="confirmPassword"
          id="confirm-password"
          label="Confirm Password"
          type="password"
          value={this.state.confirmPassword}
          onChange={this.handleChange}
        />
        <Button type="submit" color="secondary" variant="raised">
          Create Account
        </Button>
      </form>
    )
  }
}

export default withStyles(styles)(SignupForm)
