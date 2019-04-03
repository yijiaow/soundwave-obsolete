import React, { Component } from 'react'
import KeywordForm from './KeywordForm'
import LocationForm from './LocationForm'
import SignupForm from './SignupForm'
import SigninForm from './SigninForm'
import Genres from './Genres'
import Carousel from './Carousel'
import { Events } from './Events'

const serialize = obj => {
  const queries = []
  for (let [key, value] of Object.entries(obj)) {
    if (value !== '') {
      queries.push(key.concat('=', encodeURI(value)))
    }
  }
  return queries.join('&')
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signupOpen: false,
      signinOpen: false,
      params: {
        city: 'Los Angeles',
        state: 'CA',
        zipcode: ''
      },
      searchResults: null
    }
    this.displayCurrentUser = this.displayCurrentUser.bind(this)
    this.handleSignupForm = this.handleSignupForm.bind(this)
    this.handleSigninForm = this.handleSigninForm.bind(this)
    this.handleSignout = this.handleSignout.bind(this)
    this.handleLocationUpdate = this.handleLocationUpdate.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentDidMount() {
    this.displayCurrentUser()
  }
  displayCurrentUser() {
    if (sessionStorage.getItem('token')) {
      this.setState({ currentUser: sessionStorage.getItem('user') })
    }
  }
  handleSignupForm() {
    this.setState({ signupOpen: !this.state.signupOpen })
  }
  handleSigninForm() {
    this.setState({ signinOpen: !this.state.signinOpen })
  }
  handleSignout() {
    sessionStorage.clear()
    this.setState({ currentUser: null })
  }
  handleLocationUpdate(location) {
    this.setState({ params: location })
  }
  handleSearch(params) {
    const merged = Object.assign(params, {
      city: this.state.params.city,
      postalCode: this.state.params.zipcode
    })
    const queryString = serialize(merged)
    fetch(`/events/search?${queryString}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ searchResults: data.events })
      })
      .catch(err => {
        console.error(err)
      })
  }
  render() {
    const { classes } = this.props
    const searchResults = this.state.searchResults
    return (
      <ErrorBoundary>
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Typography variant="display3" color="secondary">
              SoundWave
            </Typography>
            <div className={classes.searchContainer}>
              <KeywordForm search={this.handleSearch} />
              <LocationForm
                search={this.handleSearch}
                updateLocation={this.handleLocationUpdate}
                currentLocation={this.state.params}
              />
            </div>
            {this.state.currentUser ? (
              <div className={classes.userContainer}>
                <Typography className={classes.user} variant="title">
                  {this.state.currentUser}
                </Typography>
                <Button
                  className={classes.signoutButton}
                  variant="outlined"
                  onClick={this.handleSignout}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className={classes.userContainer}>
                <SignupForm onAutoSignin={this.displayCurrentUser} />
                <SigninForm onSignin={this.displayCurrentUser} />
              </div>
            )}
          </AppBar>
          <Genres genres={genres} search={this.handleSearch} />
          <section className={classes.section}>
            {searchResults && <Events events={this.state.searchResults} />}
            {!searchResults && <Carousel festivals={festivals} />}
          </section>
        </div>
      </ErrorBoundary>
    )
  }
}

export default withStyles(styles)(App)
