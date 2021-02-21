import apiUrl from '../apiConfig'
import axios from 'axios'

// Create a new kanban card
export const cardCreate = (user, cardData) => {
  return axios({
    url: apiUrl + '/cards/',
    method: 'POST',
    headers: {
      // we need the user so we have access to their token
      'Authorization': `Token ${user.token}`
    },
    // send the notes and status as our data object
    data: { cardData }

  })
}

// Get all new kanban cards
export const cardIndex = (user) => {
  return axios({
    url: apiUrl + '/cards/',
    method: 'GET',
    headers: {
      // we need the user so we have access to their token
      'Authorization': `Token ${user.token}`
    }
  })
}
