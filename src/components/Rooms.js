import React, { Component } from "react";
import ReportHeader from "./ReportHeader";
import Room from "./Room";
import { Context, AppProvider } from "./context";
import { connect } from "react-redux";
import MapSpreadsheetToStore from "./MapSpreadsheetToStore";
import { getRooms } from "../actions/roomActions";

class Report extends Component {
	componentDidMount() {
		setTimeout(() => {
			console.log(this.props);
		}, 1500);
	}
	/* 	onSetCleanHandler = (value, id, click) => {
		!click
			? value.dispatch({ type: "SET_CLEAN", payload: id })
			: value.dispatch({ type: "UNSET_CLEAN", payload: id });
	};
	toggleCheckedOut = ({ dispatch }, id) => {
		dispatch({ type: "TOGGLE_CHECKOUT", payload: id });
	}; */

	render() {
		return (
			<div>
				<MapSpreadsheetToStore />
				<ReportHeader />
				{
					<ul className="report-component">
						{this.props.rooms.map(room => (
							<Room
								key={room.id}
								roomNote={room.cleaningNote}
								id={room.id}
								isCheckedOut={room.isCheckedOut}
								toggleCheckedOut={this.toggleCheckedOut.bind(this)}
								roomNumber={room.number}
								resStatus={room.resStatus}
								roomStatus={room.roomStatus}
								onSetCleanHandler={this.onSetCleanHandler.bind(this)}
							/>
						))}
					</ul>
				}
			</div>
		);
	}
}
const mapStateToProps = state => ({
	rooms: state
});
export default connect(
	mapStateToProps,
	{ getRooms }
)(Report);

{
	/*  */
}
