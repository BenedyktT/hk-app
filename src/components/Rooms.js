import React, { Component } from "react";
import ReportHeader from "./ReportHeader";
import Room from "./Room";

import { connect } from "react-redux";
import { fetchRooms, setRoomClean } from "../actions/roomActions";

class Report extends Component {
	state = {
		rooms: []
	};
	componentDidMount() {
		this.props.fetchRooms();
	}
	static getDerivedStateFromProps(props, state) {
		if (props.rooms) {
			return {
				rooms: props.rooms
			};
		}

		return null;
	}
	onSetRoomClean = id => {
		const room = this.props.rooms.find(room => room.id === id);
		this.props.setRoomClean(room);
	};

	render() {
		const { rooms } = this.state;

		if (rooms) {
			return rooms.map(room => (
				<Room
					key={room.id}
					roomNote={room.cleaningNote}
					id={room.id}
					isCheckedOut={room.isCheckedOut}
					roomNumber={room.number}
					resStatus={room.resStatus}
					roomStatus={room.roomStatus}
					onSetRoomClean={this.onSetRoomClean.bind(room)}
				/>
			));
		}
		return (
			<div>
				<ReportHeader />
				{<ul className="report-component">...loading</ul>}
			</div>
		);
	}
}
const mapStateToProps = state => ({
	rooms: state.roomActionsReducer.rooms,
	pending: state.roomActionsReducer.pending,
	maintaince: state.roomActionsReducer.maintaince
});
export default connect(mapStateToProps, {
	fetchRooms,
	setRoomClean
})(Report);
