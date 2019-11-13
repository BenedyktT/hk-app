import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchRooms } from "../actions/roomActions";

class RoomDetail extends Component {
	state = {};

	shouldComponentRender() {
		const { pending } = this.props;
		if (pending === false) {
			return false;
		}
		// more tests
		return true;
	}
	renderRoom() {
		const { rooms } = this.props;
		const room = rooms.filter(e => {
			return e.id === this.props.match.params.id;
		});
		const {
			number,
			roomStatus,
			resStatus,
			cleaningNote,
			isCheckedOut
		} = room[0];
		return (
			<div className="">
				<ul>
					<li>{number}</li>
					<li>{roomStatus}</li>
					<li>{resStatus}</li>
					<li>{cleaningNote}</li>
					<li>{isCheckedOut ? "checked out" : "not checked out yet"}</li>
				</ul>
			</div>
		);
	}
	render() {
		if (this.shouldComponentRender()) return <h1>PENDING</h1>;
		return this.renderRoom();
	}
}

const mapStateToProps = state => ({
	rooms: state.rooms,
	pending: state.pending
});
export default connect(
	mapStateToProps,
	{ fetchRooms }
)(RoomDetail);
