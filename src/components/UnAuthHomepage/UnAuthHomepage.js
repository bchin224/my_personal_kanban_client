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
        <p id="unauth-home">Welcome! Sign up or sign in to start adding cards to your
        personal kanban board!</p>
      </div>
    )
  }
}

export default UnAuthHomepage
