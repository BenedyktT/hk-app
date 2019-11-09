import React, { Component } from "react";
import ReportHeader from "./ReportHeader";
import Room from "./Room";

import { connect } from "react-redux";
import { getRooms, getRoomsPending } from "../reducers/index";
import { fetchRooms } from "../actions/roomActions";

class Report extends Component {
	state = {
		rooms: []
	};

	renderRaport() {
		try {
			this.props.rooms.map(room => (
				<Room
					key={room.id}
					roomNote={room.cleaningNote}
					id={room.id}
					isCheckedOut={room.isCheckedOut}
					toggleCheckedOut={this.toggleCheckedOut}
					roomNumber={room.number}
					resStatus={room.resStatus}
					roomStatus={room.roomStatus}
					onSetCleanHandler={this.onSetCleanHandler}
				/>
			));
		} catch (e) {
			return <h1>ERROR</h1>;
		}
	}
	onSetCleanHandler = (id, click) => {
		console.log(id, click);
	};
	toggleCheckedOut = id => {
		console.log(id);
	};

	render() {
		return (
			<div>
				<ReportHeader />
				{<ul className="report-component">{this.renderRaport()}</ul>}
			</div>
		);
	}
}
const mapStateToProps = state => ({
	rooms: getRooms(state),
	pending: getRoomsPending(state)
});
export default connect(
	mapStateToProps,
	{ fetchRooms }
)(Report);
