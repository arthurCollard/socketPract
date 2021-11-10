import { SET_TOTAL } from "../constants/actionTypes"

const setTotal = (total)=> (dispatch) => {
    dispatch({type: SET_TOTAL, payload: total})
}

const totalActions = {
    setTotal
}

export default totalActions 