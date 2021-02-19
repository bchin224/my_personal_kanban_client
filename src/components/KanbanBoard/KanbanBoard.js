import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-modal'
import ModalFooter from 'react-bootstrap/ModalFooter'

// Prevents modal element error in console
Modal.setAppElement('#root')

const KanbanBoard = props => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  // const [show, setShow] = useState(false)
  //
  const handleClose = () => setModalIsOpen(false)
  const handleShow = () => setModalIsOpen(true)

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
                  }
                }
              }>
              <h2> Add a Card </h2>
              <p> Insert Note </p>
              <ModalFooter>
                <Button onClick={handleClose}> Close </Button>
                <Button> Create Card </Button>
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
