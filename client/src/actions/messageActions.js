import { ADD_MESSAGE } from "../constants/actionTypes"

const addMessage = (message) => (dispatch) => {
    dispatch({type: ADD_MESSAGE, payload: message})
}

const messageActions = {
    addMessage
}

export default messageActions 