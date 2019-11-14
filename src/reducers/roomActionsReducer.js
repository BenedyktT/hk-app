import {
	SET_CLEAN,
	UNSET_CLEAN,
	TOGGLE_CHECKOUT,
	GET_ROOMS_PENDING,
	GET_ROOMS_SUCCESS
} from "../actions/types";
const initialState = {
	rooms: [],
	pending: false
};
export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CLEAN:
			return {
				...state,
				rooms: state.rooms.map(room =>
					room.id === action.payload.id
						? { ...room, roomStatus: "READY" }
						: room
				)
			};
		case UNSET_CLEAN:
			return state.rooms.find(element =>
				element.id === action.payload
					? (element.roomStatus = "Not Clean")
					: null
			);
		case TOGGLE_CHECKOUT:
			return state.rooms.map(room => {
				return action.payload === room.id
					? (room.isCheckedOut = !room.isCheckedOut)
					: { ...state };
			});
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

		default:
			return state;
	}
}
