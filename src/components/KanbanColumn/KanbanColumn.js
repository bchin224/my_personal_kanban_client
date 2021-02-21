import React from 'react'
import Card from 'react-bootstrap/Card'
import KanbanCardIndex from '../KanbanCardIndex/KanbanCardIndex'

// make card for all In Progress cards
export const ToDoColumn = data => {
  return (
    <div>
      Hello
    </div>
  )
}

export const InProgressColumn = data => {
  return (
    <div>
      <Card style={{ width: '10rem' }}>
        <Card.Body>
          <Card.Text>
            <KanbanCardIndex/>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export const CompletedColumn = data => {
  return (
    <div>
      <Card style={{ width: '10rem' }}>
        <Card.Body>
          <Card.Text>
            {data.card}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}
