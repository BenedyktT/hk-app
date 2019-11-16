import {
	CREATE_INPUT_ELEMENT,
	ON_BATHROOM_CHANGE,
	ON_ROOM_CHANGE
} from "../actions/types";

const initialState = {
	roomInputs: [],
	bathroomInputs: [],
	bathroomValue: "",
	roomValue: "",
	bathroomArr: "",
	roomArr: ""
};

export const maintainceActionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_INPUT_ELEMENT:
			const inputType = action.payload;
			return {
				...state,
				[inputType]: [...state[inputType], `input-${state[inputType].length}`]
			};
		case ON_BATHROOM_CHANGE:
			const bathroomItem = action.payload;
			return {
				...state,
				bathroomValue: bathroomItem,
				bathroomArr: { ...state.bathroomArr, bathroomItem }
			};
		case ON_ROOM_CHANGE:
			const roomItem = action.payload;
			return {
				...state,
				roomValue: roomItem,
				roomArr: { ...state.roomArr, roomItem }
			};
		default:
			return state;
	}
};
