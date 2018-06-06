import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 360,
    padding: 30,
    borderRadius: 30
  },
  button: {
    marginTop: 36
  }
}
class SigninForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formOpen: false,
      email: '',
      password: ''
    }
    this.handleForm = this.handleForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleForm() {
    this.setState({ formOpen: !this.state.formOpen })
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
        this.setState({ email: '', password: '' })
        this.props.getUser(user)
      })
      .catch(err => console.error(err))
  }
  render() {
    const { classes } = this.props
    return (
      <div>
        <Button variant="outlined" onClick={this.handleForm}>
          Sign In
        </Button>
        <Dialog open={this.state.formOpen} onClose={this.handleForm}>
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
              onChange={this.handleChange}
            />
            <Button
              className={classes.button}
              type="submit"
              color="secondary"
              size="large"
              variant="contained"
            >
              Sign In
            </Button>
          </form>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(SigninForm)
