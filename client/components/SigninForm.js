import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = {
  container: {
    position: 'relative',
    top: 100,
    left: 300,
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    height: 300
  }
}
class SigninForm extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '' }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    const { classes } = this.props
    return (
      <form autoComplete="off" className={classes.container}>
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
          type="submit"
          color="secondary"
          variant="raised"
          onClick={this.handleSubmit}
        >
          Login
        </Button>
      </form>
    )
  }
}

export default withStyles(styles)(SigninForm)
