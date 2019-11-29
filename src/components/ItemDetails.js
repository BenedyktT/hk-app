import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";

const ItemDetails = function(props) {
	const { rooms, match } = props;
	const { roomid, itemid } = match.params;
	const render = () => {
		if (rooms) {
			let currentRoomItem;
			const roomItem = rooms.filter(room => room.id === roomid);
			let { bathroom, room, number } = roomItem[0];

			const filterBathroom = bathroom.filter(
				item => item.item.itemID === itemid
			);
			const filterRoom = room.filter(item => item.item.itemID === itemid);
			if (filterBathroom.length) {
				currentRoomItem = { ...filterBathroom[0].item, number };
			} else if (filterRoom.length) {
				currentRoomItem = filterRoom[0].item;
			}
			const { createdAt, itemID, name } = currentRoomItem;
			return (
				<div className="item-detail-container">
					<h1>Room number {number}</h1>
					<h4>Place: {filterBathroom.length ? "Bathroom" : "Room"}</h4>
					<h2>Item: {name}</h2>
					<h3>created: {moment.unix(createdAt).format("h:ss DD/mm/YYYY")}</h3>
				</div>
			);
		}
		return <h1>.........</h1>;
	};
	render();

	return render();
};

export default compose(
	firestoreConnect(() => [{ collection: "rooms" }]),
	connect(state => ({
		rooms: state.firestore.ordered.rooms
	}))
)(ItemDetails);
