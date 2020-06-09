import axios from 'axios'

export function getAllBooks () {
  return axios({
    method: 'get',
    url: 'http://localhost:3080/allbooks'
  })
}
