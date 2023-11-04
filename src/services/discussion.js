import axios from 'axios'
import { getAuthHeader } from './config'

export const baseURL = 'https://corneredu.onrender.com/discussions'


const getAllDiscussions = async (courseId) => {
  const response = await axios.get(
    `${baseURL}/getAll/` + courseId,
    getAuthHeader()
  )
  return response.data
}

const addDiscussion = async (courseId, data, category, title,isAnonymous) => {
  console.log(category)
  console.log(courseId)
  const response = await axios.post(
    `${baseURL}/add`,{
        courseId: courseId,
        data: data,
        category: category,
        title:title,
        isAnonymous:isAnonymous
        
    },
    getAuthHeader()
  )
  return response.data
}

const removeDiscussion = async (id) => {
  const response = await axios.delete(
    `${baseURL}/remove/`+id,
    getAuthHeader()
  )
  return response.data
}

const removeComment = async (Id, comment) => {
  const response = await axios.delete(
    `${baseURL}/removeComment/` + Id + '/' + comment._id,
    getAuthHeader()
  )
  return response.data
}

const addComment = async (Id, comment, user) => {
  const response = await axios.post(
    `${baseURL}/addComment`,
    {
      discussionId: Id,
      comment: {
        data:comment,
        user:user
      }
    },
    getAuthHeader()
  )
  return response.data
}

const discussionService = {
  getAllDiscussions,
  addDiscussion,
  removeDiscussion,
  addComment,
  removeComment
}
export default discussionService
