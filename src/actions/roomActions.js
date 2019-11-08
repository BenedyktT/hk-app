import {
	ADD_CONTACT,
	GET_CONTACTS,
	DELETE_CONTACT,
	UPDATE_CONTACT
} from "./types";
import Tabletop from "tabletop";

export const getRooms = rooms => async dispatch => {
	const res = Tabletop.init({
		key:
			"https://docs.google.com/spreadsheets/d/1VNSbty91bi83frVi3GQlmgnxiCLDKmAxA8ys3AVZ-Oc/edit?usp=sharing",
		simpleSheet: true
	}).then((data, tabletop) => {
		reportData = data.map(
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
					id: uuid()
				};
			}
		);
		return this.setState(() => ({ reportData }));
	});
	dispatch({
		type: GET_CONTACTS,
		payload: res
	});
};
