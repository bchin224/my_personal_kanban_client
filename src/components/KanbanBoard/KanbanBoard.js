import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-modal'
import ModalFooter from 'react-bootstrap/ModalFooter'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import messages from '../AutoDismissAlert/messages'

// // Prevents modal element error in console
Modal.setAppElement('#root')

const KanbanCardIndex = data => {
  const [cards, setCards] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [editModalId, setEditModalId] = useState(null)
  const [card, setCard] = useState({ notes: '', status: 'to-do' })

  // whenever a modal closes, clear the fields
  const handleClose = () => {
    setModalIsOpen(false)
    setCard({ notes: '', status: 'to-do' })
  }
  const handleShow = () => setModalIsOpen(true)
  const editModalShow = (id) => {
    setEditModalIsOpen(true)
    setEditModalId(id)
  }
  const editModalClose = () => {
    setEditModalIsOpen(false)
    setEditModalId(null)
  }

  const msgAlert = data.msgAlert

  const fetchCards = () => {
    axios({
      url: apiUrl + '/cards/',
      method: 'GET',
      headers: {
        // we need the user so we have access to their token
        'Authorization': `Token ${data.user.token}`
      }
    })
      // res.data.cards is the array of cards created
      .then(res => setCards(res.data.cards))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Load Your Kanban Cards: ' + error.message,
          message: messages.indexFailure,
          variant: 'danger'
        })
      })
  }

  useEffect(() => {
    fetchCards()
  }, [])

  // handle changing card.status to selected dropdown
  const handleStatus = event => {
    setCard(prevCardStatus => {
      // event is the eventKey
      const updatedStatus = { 'status': event }
      const editedStatus = Object.assign({}, prevCardStatus, updatedStatus)
      return editedStatus
    })
  }

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

  // When update button on modal is clicked, handle edits
  const handleUpdate = () => {
    event.preventDefault()
    axios({
      url: apiUrl + '/cards/' + event.target.dataset.cardsid + '/',
      method: 'PATCH',
      headers: {
        // we need the user so we have access to their token
        'Authorization': `Token ${data.user.token}`
      },
      // send the notes and status as our data object
      data: { card }
    })
      .then(() => setEditModalIsOpen(false))
      .then(() => fetchCards())
      .then(() => setCard({ notes: '', status: 'to-do' }))
      .then(() => msgAlert({
        heading: 'Kanban Card Updated',
        message: messages.updateSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Kanban Card Failed to Update: ' + error.message,
          message: messages.updateFailure,
          variant: 'danger'
        })
      })
  }

  // When create button is clicked, send data from modal to API
  const handleCreate = () => {
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
      .then(() => setModalIsOpen(false))
      .then(() => fetchCards())
      .then(() => setCard({ notes: '', status: 'to-do' }))
      .then(() => msgAlert({
        heading: 'Kanban Card Created',
        message: messages.createSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create New Card: ' + error.message,
          message: messages.createFailure,
          variant: 'danger'
        })
      })
  }

  // When delete button on modal is clicked, delete card
  const handleDelete = () => {
    event.preventDefault()
    axios({
      url: apiUrl + '/cards/' + event.target.dataset.cardsid,
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${data.user.token}`
      }
    })
      .then(() => setEditModalIsOpen(false))
      .then(() => fetchCards())
      .then(() => setCard({ notes: '', status: 'to-do' }))
      .then(() => msgAlert({
        heading: 'Kanban Card Deleted',
        message: messages.deleteSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Delete Card: ' + error.message,
          message: messages.deleteFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <div>
      <div className="container">
        <div className="row" id="kanban-board">
          {/* ---------------------------- THE TO-DO COLUMN ---------------------------- */}
          <div className="col-md" id="kanban-column">
            <h4>To Do</h4>
            <hr/>
            <ul>
              {
                cards.filter(card => card.status === 'to-do').map(cards =>
                  <Card key={cards.id} style={{ width: '100%' }} border="danger" className='mt-3'>
                    {cards.notes}
                    <Button onClick={() => editModalShow(cards.id)} variant="danger"> Edit </Button>
                    {/* When clicked outside of modal, set modalIsOpen to false  */}
                    <Modal
                      isOpen={editModalIsOpen && editModalId === cards.id}
                      onRequestClose={editModalClose}
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
                      <h2> Update or Delete Card </h2>
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
                        <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Status
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onSelect={handleStatus} eventKey='to-do'>To-Do</Dropdown.Item>
                            <Dropdown.Item onSelect={handleStatus} eventKey='WIP'>In Progress</Dropdown.Item>
                            <Dropdown.Item onSelect={handleStatus} eventKey='completed'>Completed</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Button onClick={handleUpdate} variant="success" data-cardsid={cards.id}> Update </Button>
                        <Button onClick={handleDelete} data-cardsid={cards.id}> Delete </Button>
                        <Button onClick={editModalClose}> Close </Button>
                      </ModalFooter>
                    </Modal>
                  </Card>
                )
              }
            </ul>
            <Button onClick={handleShow}> Add a to do </Button>
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
          {/* -------------------------- THE IN PROGRESS COLUMN -------------------------- */}
          <div className="col-md" id="kanban-column">
            <div id="in-progress-title">
              <h4>In Progress</h4>
            </div>
            <hr/>
            <ul>
              {
                cards.filter(card => card.status === 'WIP').map(cards =>
                  <Card key={cards.id} style={{ width: '100%' }} border="warning" className='mt-3'>
                    {cards.notes}
                    <Button onClick={() => editModalShow(cards.id)} variant="warning"> Edit </Button>
                    {/* When clicked outside of modal, set modalIsOpen to false  */}
                    <Modal
                      isOpen={editModalIsOpen && editModalId === cards.id}
                      onRequestClose={editModalClose}
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
                      <h2> Update or Delete Card </h2>
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
                        <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Status
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onSelect={handleStatus} eventKey='to-do'>To-Do</Dropdown.Item>
                            <Dropdown.Item onSelect={handleStatus} eventKey='WIP'>In Progress</Dropdown.Item>
                            <Dropdown.Item onSelect={handleStatus} eventKey='completed'>Completed</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Button onClick={handleUpdate} variant="success" data-cardsid={cards.id}> Update </Button>
                        <Button onClick={handleDelete} data-cardsid={cards.id}> Delete </Button>
                        <Button onClick={editModalClose}> Close </Button>
                      </ModalFooter>
                    </Modal>
                  </Card>)
              }
            </ul>
          </div>
          {/* -------------------------------- THE COMPLETED COLUMN -------------------------------- */}
          <div className="col-md" id="kanban-column">
            <div id="completed-title">
              <h4>Completed</h4>
            </div>
            <hr/>
            <ul>
              {
                cards.filter(card => card.status === 'completed').map(cards =>
                  <Card key={cards.id} style={{ width: '100%' }} border="success" className='mt-3'>
                    {cards.notes}
                    <Button onClick={() => editModalShow(cards.id)} variant="success"> Edit </Button>
                    {/* When clicked outside of modal, set modalIsOpen to false  */}
                    <Modal
                      isOpen={editModalIsOpen && editModalId === cards.id}
                      onRequestClose={editModalClose}
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
                      <h2> Update or Delete Card </h2>
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
                        <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Status
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onSelect={handleStatus} eventKey='to-do'>To-Do</Dropdown.Item>
                            <Dropdown.Item onSelect={handleStatus} eventKey='WIP'>In Progress</Dropdown.Item>
                            <Dropdown.Item onSelect={handleStatus} eventKey='completed'>Completed</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Button onClick={handleUpdate} variant="success" data-cardsid={cards.id}> Update </Button>
                        <Button onClick={handleDelete} data-cardsid={cards.id}> Delete </Button>
                        <Button onClick={editModalClose}> Close </Button>
                      </ModalFooter>
                    </Modal>
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
