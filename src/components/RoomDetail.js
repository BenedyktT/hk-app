import React, { Component } from "react";
import { connect } from "react-redux";
import { getRooms, getRoomsPending } from "../reducers/index";
import { fetchRooms } from "../actions/roomActions";

class RoomDetail extends Component {
	state = {
		rooms: null
	};
	componentDidMount() {
		this.props.fetchRooms();
	}
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
			console.log(e.id === this.props.match.params.id);
			return e.id == this.props.match.params.id;
		});
		console.log(room);
		return <h1>room</h1>;
	}
	render() {
		if (this.shouldComponentRender()) return <h1>PENDING</h1>;
		return this.renderRoom();
	}
}

const mapStateToProps = state => ({
	rooms: getRooms(state),
	pending: getRoomsPending(state)
});
export default connect(
	mapStateToProps,
	{ fetchRooms }
)(RoomDetail);
