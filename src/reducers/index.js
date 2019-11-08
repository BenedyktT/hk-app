import {
	GET_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	UPDATE_CONTACT
} from "../actions/types";
const initialState = {
	contacts: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_CONTACTS:
			return { ...state, contacts: action.payload };
		default:
			return state;
	}
}
