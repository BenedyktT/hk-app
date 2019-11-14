import React from "react";
import { ReactComponent as Lock } from "../images/locked.svg";
import { ReactComponent as Cancel } from "../images/cancel.svg";
import { ReactComponent as Tick } from "../images/tick.svg";
import { ReactComponent as Tools } from "../images/tools.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Rooms extends React.Component {
	state = {
		buttonClicked: false,
		id: null
	};

	changeStyleOnSetClean = () => {
		this.setState(() => ({
			buttonClicked: !this.state.buttonClicked
		}));
	};
	onSetClean = id => {
		this.changeStyleOnSetClean();

		this.props.onSetRoomClean(id);
	};
	toggleCheckedOut = id => {
		this.props.toggleCheckedOut(id);
	};
	render() {
		return (
			<div
				className={
					this.state.buttonClicked ||
					this.props.roomStatus.toUpperCase() === "CLEAN"
						? "room room--clean"
						: "room"
				}
			>
				<div className="room__bg"></div>
				<ul className="room__elements">
					<li>
						<button
							className=""
							/* onClick={this.props.toggleCheckedOut.bind(this, this.props.id)} */
						>
							{" "}
							{this.props.isCheckedOut ? (
								<Tick width="20px" height="20px" />
							) : (
								<Cancel width="20px" height="20px" />
							)}
						</button>
						{this.props.roomNumber}
						{this.props.roomNote && <p className="">{this.props.roomNote}</p>}
					</li>
					<li>{this.props.resStatus}</li>
					<li>{this.props.roomStatus}</li>
					<li className="room-actions">
						{this.props.roomStatus.toUpperCase() !== "CLEAN" && (
							<button onClick={this.onSetClean.bind(this, this.props.id)}>
								<Lock
									width="20px"
									height="20px"
									fill={this.state.buttonClicked ? "green" : null}
								/>
							</button>
						)}
						<Link to={`/rooms/${this.props.id}`}>
							<Tools height="20px" width="20px" />
						</Link>
					</li>
				</ul>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	rooms: state.roomActionsReducer.rooms
});
export default connect(mapStateToProps, null)(Rooms);
