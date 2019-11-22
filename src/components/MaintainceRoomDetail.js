import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class MaintainceRoomDetail extends Component {
	state = {
		isDetailsClicked: false
	};
	removeItem = (item, e) => {
		const currentCategory = e.currentTarget.id;
		const { number, room, bathroom } = this.props;
		const itemToUpd = {};
		const updRoom = {
			number,
			room: [],
			bathroom: ["kettle"]
		};
		console.log(itemToUpd);
	};
	removeRoom = () => {
		const { id, firestore } = this.props;
		firestore.delete({ collection: "rooms", doc: id });
	};
	render() {
		const { number, room, bathroom } = this.props;
		return (
			<div className="room-detail">
				<ul className="room-detail__elements">
					<li className="room-detail__room danger">
						<button
							className="btn btn__transparent"
							onClick={() =>
								this.setState(() => ({
									isDetailsClicked: !this.state.isDetailsClicked
								}))
							}
						>
							{number}
						</button>
					</li>
					<li>
						<button onClick={this.removeRoom}>
							<i className="fas fa-minus-square"></i>
						</button>
					</li>
				</ul>
				{this.state.isDetailsClicked && (
					<div className="maintaince">
						<div className="bathroom-col col">
							<h5>Bathroom</h5>
							<ul className="bathroom-col col">
								{bathroom.map((e, index) => (
									<li key={index}>
										{e}{" "}
										<button id="room" onClick={this.removeItem.bind(this, e)}>
											<i className="fas fa-backspace danger-color"></i>
										</button>
									</li>
								))}
							</ul>
						</div>

						<div className="bathroom-col col">
							<h5>Room</h5>
							<ul className="bathroom-col col">
								{room.map((e, index) => (
									<li key={index}>
										{e}{" "}
										<button
											id="bathroom"
											onClick={this.removeItem.bind(this, e)}
										>
											<i className="fas fa-backspace danger-color"></i>
										</button>
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default compose(
	firestoreConnect(() => [{ collection: "rooms" }]),
	connect(state => ({
		rooms: state.firestore.ordered.rooms
	}))
)(MaintainceRoomDetail);
