import apiUrl from '../apiConfig'
import axios from 'axios'

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
