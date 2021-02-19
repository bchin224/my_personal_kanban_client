import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-modal'
import ModalFooter from 'react-bootstrap/ModalFooter'
import apiUrl from '../../apiConfig'
import axios from 'axios'

// Prevents modal element error in console
Modal.setAppElement('#root')

const KanbanBoard = data => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  // const [cardText, setCardText] = useState('Enter card text here')
  // const [show, setShow] = useState(false)
  const [card, setCard] = useState({ notes: '', status: 'to-do' })
  const handleClose = () => setModalIsOpen(false)
  const handleShow = () => setModalIsOpen(true)

  // handle changing card.notes to textarea input
  const handleChange = event => {
    event.persist()
    setCard(prevCardData => {
      // event.target.value is each letter typed into the textarea
      // console.log('Event.target.notes is ', event.target.value)
      const updatedField = { 'notes': event.target.value }
      // now instead of saying prevState.card, we can just use prevCardData
      const editedCard = Object.assign({}, prevCardData, updatedField)
      return editedCard
    })
  }
  // console.log('This is card data', { card:{ card })
  // When create button is clicked, send data from modal to API
  const handleCreate = () => {
    console.log('This is user data', data.user)
    console.log('This is card data', { card })
    event.preventDefault()
    axios({
      url: apiUrl + '/cards/',
      method: 'POST',
      headers: {
        // we need the user so we have access to their token
        'Authorization': `Token ${data.user.token}`
      },
      // send the notes and status as our data object
      data: { card }
    })
      .then(res => console.log('This is data:', res.card))
      // .then(res => setCard(res.cardData))
      .catch('Error', console.error)
  }
  // console.log('After handle create data ', cardData)

  return (
    <div>
      <p>Hello authentication</p>
      <div className="container">
        <div className="row" id="kanban-board">
          <div className="col-md" id="kanban-column">
            <h4>To Do</h4>
            <hr/>
            {/* On button click, set modalIsOpen state to true to open modal  */}
            <Button onClick={handleShow}> Add a to do </Button>
            {/* When clicked outside of modal, set modalIsOpen to false  */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={handleClose}
              animation={true}
              style={
                {
                  overlay: {
                    backgroundColor: 'rgba(169, 169, 169, 0.7)'
                  },
                  content: {
                    left: '150px',
                    right: '150px',
                    bottom: '300px',
                    padding: '15px'
                  }
                }
              }>
              <h2> Add a Card </h2>
              <div className="form-group">
                <label htmlFor="add-card-text" className="col-form-label">Message:</label>
                <textarea
                  className="form-control"
                  id="add-card-text"
                  value={card.notes}
                  onChange={handleChange}
                />
              </div>
              <ModalFooter>
                <Button onClick={handleClose}> Close </Button>
                <Button onClick={handleCreate}> Create Card </Button>
              </ModalFooter>
            </Modal>
          </div>
          <div className="col-md" id="kanban-column">
            <h4>In Progress</h4>
            <hr/>
          </div>
          <div className="col-md" id="kanban-column">
            <h4>Complete</h4>
            <hr/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KanbanBoard

// <Button variant="primary" onClick={handleShow}>
//   Add New Card
// </Button>
// <Modal show={show} onHide={handleClose}>
//   <Modal.Header closeButton>
//     <Modal.Title>To Do</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>Insert Notes Text Field Here</Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={handleClose}>
//       Close
//     </Button>
//     <Button variant="primary" onClick={handleClose}>
//       Create Card
//     </Button>
//   </Modal.Footer>
// </Modal>

// <h4>Status</h4>
// <div className="radio">
//   <input type="radio" name="optradio" checked>To-Do</input>
// </div>
// <div className="radio">
//   <input type="radio" name="optradio">In Progress</input>
// </div>
// <div className="radio disabled">
//   <input type="radio" name="optradio" disabled>Complete</input>
// </div>
