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

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      errors: { password: '', confirmPassword: '' }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleValidate = this.handleValidate.bind(this)
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleValidate(event) {
    const errors = this.state.errors
    if (event.target.name === 'password') {
      errors['password'] =
        this.state.password.length >= 8
          ? ''
          : 'Password needs to be at least 8 characters long.'
    }
    if (event.target.name === 'confirmPassword') {
      errors['confirmPassword'] =
        this.state.password === this.state.confirmPassword
          ? ''
          : 'Password confirmation does not match Password.'
    }
    this.setState({ errors })
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
    const disabled =
      this.state.email === '' ||
      Object.values(this.state.errors).some(error => error !== '')
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
          helperText={this.state.errors.password}
          onChange={this.handleChange}
          onBlur={this.handleValidate}
        />
        <TextField
          required
          name="confirmPassword"
          id="confirm-password"
          label="Confirm Password"
          type="password"
          value={this.state.confirmPassword}
          helperText={this.state.errors.confirmPassword}
          onChange={this.handleChange}
          onBlur={this.handleValidate}
        />
        <Button
          className={classes.button}
          type="submit"
          color="secondary"
          size="large"
          variant="contained"
          disabled={disabled}
        >
          Create Account
        </Button>
      </form>
    )
  }
}

export default withStyles(styles)(SignupForm)
