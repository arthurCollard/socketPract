import { CREATE_ID } from "../constants/actionTypes"

const initialState ={
    id: ""
}
const loginReducer = (state = initialState, action) => {
    switch (action.type){
        case CREATE_ID:
            return {
                ...state,
                id: action.payload
            }
        default: 
            return state
    }

}

export default loginReducer