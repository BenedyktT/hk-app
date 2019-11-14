import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { fetchRooms } from "../actions/roomActions";

class RoomDetail extends Component {
	state = {};

	shouldComponentRender() {
		const { pending } = this.props;
		if (pending === false) {
			return false;
		}
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
			<div className="room-detail">
				<ul className="room-detail__elements">
					<li className="success">{number}</li>
					<li className={classnames({ success: roomStatus !== "Not Clean" })}>
						{roomStatus}
					</li>
					<li>{resStatus}</li>
					{cleaningNote && <li>{cleaningNote}</li>}
					<li
						className={classnames({
							success: isCheckedOut,
							danger: !isCheckedOut
						})}
					>
						{isCheckedOut ? "checked out" : "not checked out yet"}
					</li>
				</ul>
				<div className="maintaince">
					<h3>Maintaince/Shoplist room: {number}</h3>
					<table className="greyGridTable">
						<thead>
							<tr>
								<th>Room</th>
								<th>Bathroom</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Kettle</td>
								<td>Tap</td>
							</tr>
							<tr>
								<td>entry</td>
								<td>Shower</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
	render() {
		if (this.shouldComponentRender()) return <h1>PENDING</h1>;
		return this.renderRoom();
	}
}

const mapStateToProps = state => ({
	rooms: state.roomActionsReducer.rooms,
	pending: state.roomActionsReducer.pending
});
export default connect(mapStateToProps, { fetchRooms })(RoomDetail);
