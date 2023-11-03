require('dotenv').config()

export const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem('eduhub-user')).token
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const getMultiPartAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem('eduhub-user')).token
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  }
  
}

export const getS3Credintials = () => ({
  //accessKeyId:process.env.ACCESS_KEY_ID,
  accessKeyId:'AKIA3QXLY7LWW4F7K24A',
  //secretAccessKey: process.env.SECRET_ACCESS_KEY
  secretAccessKey: '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'})

// ACCESS_KEY_ID='AKIA3QXLY7LWSOY7N5UO'
// SECRET_ACCESS_KEY='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'