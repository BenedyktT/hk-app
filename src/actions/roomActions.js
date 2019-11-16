import {
	SET_CLEAN,
	UNSET_CLEAN,
	TOGGLE_CHECKOUT,
	GET_ROOMS_SUCCESS,
	GET_ROOMS_PENDING
} from "./types";
import Tabletop from "tabletop";
import uuid from "uuid";
import moment from "moment";

export const fetchRooms = () => dispatch => {
	dispatch(getRoomsPending());

	Tabletop.init({
		key: process.env.REACT_APP_API_KEY,
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
					isCheckedOut: false,
					id: uuid(),
					createdAt: moment().unix()
				};
			}
		);
		dispatch(getRoomsSuccess(reportData));
		return reportData;
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

export const setRoomClean = (id, state) => {
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
