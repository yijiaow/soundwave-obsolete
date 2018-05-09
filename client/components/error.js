import React, { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ error: error, errorInfo: errorInfo })
  }
  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h5>Something went wrong.</h5>
          <details>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      )
    }
    return this.props.children
  }
}
