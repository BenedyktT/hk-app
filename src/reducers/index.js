import {
	GET_ROOMS_PENDING,
	GET_ROOMS_SUCCESS,
	SET_CLEAN,
	UNSET_CLEAN,
	TOGGLE_CHECKOUT
} from "../actions/types";
const initialState = {
	rooms: [],
	pending: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ROOMS_PENDING:
			return {
				...state,
				pending: true
			};
		case GET_ROOMS_SUCCESS:
			return {
				...state,
				rooms: action.payload,
				pending: false
			};
		case SET_CLEAN:
			return state.rooms.find(element =>
				element.id === action.payload ? (element.roomStatus = "Ready") : null
			);
		case UNSET_CLEAN:
			return state.rooms.find(element =>
				element.id === action.payload
					? (element.roomStatus = "Not Clean")
					: null
			);
		case TOGGLE_CHECKOUT:
			state.rooms.map(room => {
				return action.payload === room.id
					? (room.isCheckedOut = !room.isCheckedOut)
					: { ...state };
			});
		default:
			return state;
	}
}

export const getRooms = state => state.rooms;
export const getRoomsPending = state => state.pending;
