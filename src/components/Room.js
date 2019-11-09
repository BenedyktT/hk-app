import React from "react";
import { ReactComponent as Lock } from "../images/locked.svg";
import { ReactComponent as Cancel } from "../images/cancel.svg";
import { ReactComponent as Tick } from "../images/tick.svg";
import { ReactComponent as Tools } from "../images/tools.svg";
import { Link } from "react-router-dom";
export default class Rooms extends React.Component {
	state = {
		buttonClicked: false,
		id: null
	};
	changeStyleOnSetClean = () => {
		this.setState(() => ({
			buttonClicked: !this.state.buttonClicked
		}));
	};
	onSetClean = (id, click) => {
		this.changeStyleOnSetClean();
		this.props.onSetCleanHandler(id, click);
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
				<li>
					<button
						className="btn"
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
						<button
							onClick={this.onSetClean.bind(
								this,
								this.props.id,
								this.state.buttonClicked
							)}
						>
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
			</div>
		);
	}
}
