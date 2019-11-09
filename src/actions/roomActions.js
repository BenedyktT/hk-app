import {
	SET_CLEAN,
	UNSET_CLEAN,
	TOGGLE_CHECKOUT,
	GET_ROOMS_PENDING,
	GET_ROOMS_SUCCESS
} from "./types";
import Tabletop from "tabletop";
import uuid from "uuid";

export const fetchRooms = () => dispatch => {
	dispatch(getRoomsPending());
	Tabletop.init({
		key:
			"https://docs.google.com/spreadsheets/d/1VNSbty91bi83frVi3GQlmgnxiCLDKmAxA8ys3AVZ-Oc/edit?usp=sharing",
		simpleSheet: true
	}).then(data => {
		const reportData = data.map(
			({
				Room: number,
				Roomstatus: roomStatus,
				Status: resStatus,
				"Room Notes": cleaningNote
			}) => {
				return {
					number,
					roomStatus,
					resStatus,
					cleaningNote,
					isCheckedOut: false
				};
			}
		);
		const roomId = reportData.map(room => {
			return { ...room, id: uuid() };
		});
		console.log(roomId);
		dispatch(getRoomsSuccess(roomId));
		return roomId;
	});
};

export const getRoomsPending = () => {
	return {
		type: GET_ROOMS_PENDING
	};
};
export const getRoomsSuccess = rooms => {
	return {
		type: GET_ROOMS_SUCCESS,
		payload: rooms
	};
};

export const setRoomClean = id => {
	return {
		type: SET_CLEAN,
		payload: id
	};
};
export const setRoomNotClean = id => {
	return {
		type: UNSET_CLEAN,
		payload: id
	};
};
export const toggleCheckout = id => {
	return {
		type: TOGGLE_CHECKOUT,
		payload: id
	};
};
