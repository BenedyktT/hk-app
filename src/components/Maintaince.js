import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import MaintainceRoomDetail from "./MaintainceRoomDetail";
import { Link } from "react-router-dom";
class Maintaince extends Component {
	addRoom = () => {};
	render() {
		const { rooms } = this.props;

		if (rooms) {
			return (
				<div className="">
					<Link to="/add/room">
						<button className="btn btn__color" onClick={this.addRoom}>
							Add Room
						</button>
					</Link>
					{rooms.map(room => (
						<div key={room.id}>
							<div className="rooms">
								<MaintainceRoomDetail
									bathroom={room.bathroom}
									room={room.room}
									number={room.number}
									id={room.id}
								/>
							</div>
						</div>
					))}
				</div>
			);
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
