import axios from 'axios'
const baseUrl = '/api'

const getAllUsers = async () => {
  const response = await axios.get(`${baseUrl}/users`)
  return response.data
}

export default {
  getAllUsers
}