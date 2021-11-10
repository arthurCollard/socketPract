import { CREATE_ID } from "../constants/actionTypes"

const createId = (id)=> (dispatch) => {
    dispatch({type: CREATE_ID, payload: id})
}

const loginActions = {
    createId
}

export default loginActions 