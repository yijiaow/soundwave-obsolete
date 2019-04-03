import React, { Component } from 'react'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(224,64,251,0.4)'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'space-between',
    width: 360,
    padding: 30,
    borderRadius: 30
  },
  button: {
    marginTop: 36
  }
})

class RegisterForm extends Component {
  state = {
      email: '',
      password: '',
      confirmPassword: '',
      errors: { password: '', confirmPassword: '' }
    }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  
  handleSubmit = () => {
    const { email, password } = this.state
    fetch('/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(user => {
        sessionStorage.setItem('user', user.email)
        sessionStorage.setItem('token', user.token)
        this.props.onAutoSignin()
      })
      .catch(err => console.error(err))
  }
  render() {
    const { classes } = this.props
    const disabled =
      this.state.email === '' ||
      Object.values(this.state.errors).some(error => error !== '')
    return (
      <div>
        <Button
          className={classes.root}
          variant="contained"
          onClick={this.handleForm}
        >
          New User
        </Button>
        <Dialog open={this.state.formOpen} onClose={this.handleForm}>
          <form
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
              onBlur={this.validatePassword}
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
              onKeyUp={this.confirmPassword}
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
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(SignupForm)
