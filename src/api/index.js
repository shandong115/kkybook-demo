import axios from 'axios'

export function getOnePageBooks (currentPage) {
  return axios({
    method: 'get',
    url: 'http://192.168.31.42:3080/onePageBooks?p=' + currentPage
  })
}
