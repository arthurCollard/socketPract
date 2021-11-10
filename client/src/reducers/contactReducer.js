import { ADD_CONTACT } from "../constants/actionTypes"

const initialState ={
    contacts: []
}
const contactReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_CONTACT:
            return {
                ...state,
                contacts: action.payload
            }
        default: 
            return state
    }

}

export default contactReducer