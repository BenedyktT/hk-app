import {
	CREATE_INPUT_ELEMENT,
	ON_BATHROOM_CHANGE,
	ON_ROOM_CHANGE
} from "./types";

export const createInputElement = inputType => {
	return {
		type: CREATE_INPUT_ELEMENT,
		payload: inputType
	};
};

export const onBathroomChange = bathroomItem => {
	return {
		type: ON_BATHROOM_CHANGE,
		payload: bathroomItem
	};
};

export const onRoomChange = roomItem => {
	return {
		type: ON_ROOM_CHANGE,
		payload: roomItem
	};
};
