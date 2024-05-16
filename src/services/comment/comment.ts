import showToast from "../../atoms/Toast/Toast"
import server from "../../globals"

import axios from "axios"
import { AddCommentType } from "./types"

const apiEndpoint = `${server}/comment`

export const getComments = async (id: string|undefined) => {
  const res = await axios
    .get(`${apiEndpoint}/${id}`)
    .then(res => {return res.data})
    .catch(error => {throw error})

  return res
}

export const addComment = async (comment: AddCommentType) => {
  await axios
    .post(`${apiEndpoint}`, comment)
    .then(()=>{
      showToast("Comment added successfully!")
    }).catch((error) => {
      showToast("Error adding comment!")
      throw error
    })
}

export const deleteComment = async (id: string|undefined) => {
  await axios
    .delete(`${apiEndpoint}/${id}`)
    .then(()=>{
      showToast("Comment deleted successfully!")
    })
    .catch((error)=>{
      showToast("Error deleting comment!")
      throw error
    })
}
