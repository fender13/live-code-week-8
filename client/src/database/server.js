import axios from 'axios'

var axi = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {'accesstoken': localStorage.getItem('accessToken')}
})

export default axi