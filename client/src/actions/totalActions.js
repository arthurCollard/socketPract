import { SET_NUMBER_GOAL, SET_TOTAL } from "../constants/actionTypes"

const setTotal = (total)=> (dispatch) => {
    dispatch({type: SET_TOTAL, payload: total})
}

const setNumberGoal = (numberGoal) => (dispatch) => {
    dispatch({type: SET_NUMBER_GOAL, payload: numberGoal})
}

const totalActions = {
    setTotal,
    setNumberGoal
}

export default totalActions 