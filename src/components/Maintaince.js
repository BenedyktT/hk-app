import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import MaintainceRoomDetail from "./MaintainceRoomDetail";
class Maintaince extends Component {
	addRoom = () => {};
	render() {
		const { rooms } = this.props;
		console.log(rooms);

		if (rooms) {
			return rooms.map(room => (
				<div key={room.id}>
					<button className="btn btn__color" onClick={this.addRoom}>
						Add Room
					</button>
					<div className="rooms">
						<MaintainceRoomDetail
							bathroom={room.bathroom}
							room={room.room}
							number={room.number}
						/>
					</div>
				</div>
			));
		}
		return <div className="">Pending</div>;
	}
}

Maintaince.propTypes = {
	rooms: PropTypes.array
};
export default compose(
	firestoreConnect(() => [{ collection: "rooms" }]),
	connect(state => ({
		rooms: state.firestore.ordered.rooms
	}))
)(Maintaince);
