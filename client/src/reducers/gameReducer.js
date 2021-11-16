import { SET_NUMBER_GOAL, SET_TOTAL } from "../constants/actionTypes"

const initialState ={
    total: 0
}
const gameReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_TOTAL:
            console.log(action.payload)
            return {
                ...state,
                total: action.payload
            }
        case SET_NUMBER_GOAL: 
            return {
                ...state,
                numberGoal: action.payload
            }
        default: 
            return state
    }

}

export default gameReducer