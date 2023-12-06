import axios from 'axios'
import { getAuthHeader } from './config'

const getDeadLines = async () => {
  const response = await axios.get(`https://corneredu.onrender.com/deadlines`, getAuthHeader())
  return response.data
}

const getDeadLinesCalendar = async () => {
  const response = await axios.get(`https://corneredu.onrender.com/deadlines/calendar`, getAuthHeader())
  return response.data
}

const deadlinesService = {
  getDeadLines,
  getDeadLinesCalendar
}
export default deadlinesService
