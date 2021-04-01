import React, { Component } from 'react'
// import SignUp from '../SignUp/SignUp'
import modalBoard from '../../assets/mpk_board.jpg'
import modalImage from '../../assets/mpk_modal.jpg'

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
        <div className="container">
          <div className="row" id="kanban-board">
            <div className="col-11" id="unauth-home">
              Welcome! Sign up or sign in to start adding cards to your personal kanban board!
              If you&apos;d like to test it out, please sign in with the email &quot;guest@guest.com&quot; and password &quot;guest&quot;.
            </div>
            <div className="col" id="unauth-home">
              <img src={modalBoard} alt="View your kanban board" width="300" id="screenshot"/>
              <p className="image-notes"> View all of your daily tasks, see what projects are being worked on, and which are all done! </p>
            </div>
            <div className="col" id="unauth-home">
              <img src={modalImage} alt="Edit kanban cards" width="300" id="screenshot"/>
              <p className="image-notes"> Easily update tasks as they begin production and when they are completed. </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UnAuthHomepage
