import React, { Component } from 'react'

class UnAuthHomepage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      authenticated: {
        name: null
      }
    }
  }

  render () {
    return (
      <div>
        <p>This is the unauthenticated homepage</p>
      </div>
    )
  }
}

export default UnAuthHomepage
