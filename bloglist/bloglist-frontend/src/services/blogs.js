import axios from 'axios'
const baseUrl = '/api/blogs'
import { getUser } from './persistentUser'
const user = getUser()

let token = `Bearer ${user.token}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = async ({ id, blog }) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`,config)
  return response.data
}

const createComment = async (id, comment) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return request.data
}

export default {
  getAll,
  create,
  updateBlog,
  deleteBlog,
  createComment
}