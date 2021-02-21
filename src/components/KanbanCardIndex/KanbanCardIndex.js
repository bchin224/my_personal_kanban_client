import React, { useState, useEffect } from 'react'
// import KanbanBoard from '../KanbanBoard/KanbanBoard'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-modal'
import ModalFooter from 'react-bootstrap/ModalFooter'
import apiUrl from '../../apiConfig'
import axios from 'axios'
// import { ToDoColumn, InProgressColumn, CompletedColumn } from '../KanbanColumn/KanbanColumn'
// import ToDoColumn from '../KanbanColumn/KanbanColumn'

// MAKE CARDS PLURAL AND ADD LOGIC TO DETERMINE WHERE EACH CARD SHOULD GO
const KanbanCardIndex = data => {
  const [cards, setCards] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [card, setCard] = useState({ notes: '', status: 'to-do' })
  const handleClose = () => setModalIsOpen(false)
  const handleShow = () => setModalIsOpen(true)

  useEffect(() => {
    axios({
      url: apiUrl + '/cards/',
      method: 'GET',
      headers: {
        // we need the user so we have access to their token
        'Authorization': `Token ${data.user.token}`
      }
    })
      // res.data.cards is the array of cards created
      // .then(res => console.log('This is data:', res.data.cards))
      .then(res => setCards(res.data.cards))
      // .then(res => setCard(res.cardData))
      .catch('Error', console.error)
  }, [])

  // handle changing card.notes to textarea input
  const handleChange = event => {
    event.persist()
    setCard(prevCardData => {
      // event.target.value is each letter typed into the textarea
      const updatedField = { 'notes': event.target.value }
      const editedCard = Object.assign({}, prevCardData, updatedField)
      return editedCard
    })
  }
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
      .then(() => setModalIsOpen(false))
      // .then(res => setCard(res.cardData))
      .catch('Error', console.error)
  }

  return (
    <div>
      <div className="container">
        <div className="row" id="kanban-board">
          <div className="col-md" id="kanban-column">
            <h4>To Do</h4>
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
            <hr/>
            <ul>
              {
                cards.map(cards =>
                  <Card key={cards.id} style={{ width: '10rem' }}>
                    {cards.notes}
                    <Button variant="primary">Edit</Button>
                    <Button variant="primary">Delete</Button>
                  </Card>)
                // <li key={cards.id}>{cards.notes}</li>)
              }
            </ul>
          </div>
          <div className="col-md" id="kanban-column">
            <h4>In Progress</h4>
            <hr/>
            <ul>
              {
                cards.map(cards =>
                  <Card key={cards.id} style={{ width: '10rem' }}>
                    {cards.notes}
                    <Button variant="primary">Edit</Button>
                    <Button variant="primary">Delete</Button>
                  </Card>)
              }
            </ul>
          </div>
          <div className="col-md" id="kanban-column">
            <h4>Completed</h4>
            <hr/>
            <ul>
              {
                cards.map(cards =>
                  <Card key={cards.id} style={{ width: '10rem' }}>
                    {cards.notes}
                    <Button variant="primary">Edit</Button>
                    <Button variant="primary">Delete</Button>
                  </Card>)
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KanbanCardIndex
