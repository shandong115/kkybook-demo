import axios from 'axios'

/* export function getAllBooks () {
  return axios({
    method: 'get',
    url: 'http://192.168.31.42:3080/allbooks'
  })
} */

/* export function getAllBooks () {
  return getOnePageBooks(1)
} */
export function getOnePageBooks (currentPage) {
  return axios({
    method: 'get',
    url: 'http://192.168.31.42:3080/pageBooks?p=' + currentPage
  })
}
