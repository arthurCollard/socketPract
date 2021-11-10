import { ADD_CONTACT } from "../constants/actionTypes"

const addContact = (contacts) => ({dispatch}) => {
    dispatch({
        type: ADD_CONTACT,
        payload: contacts
    })
}

const contactActions = {
        addContact

}

export default contactActions