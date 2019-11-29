import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class MaintainceRoomDetail extends Component {
	state = {
		isDetailsClicked: false,
		roomValue: "",
		bathroomValue: "",
		isBathroomAddItemClicked: false,
		isRoomAddItemClicked: false
	};
	onRoomSubmit = e => {
		e.preventDefault();
		const { bathroomValue, roomValue } = this.state;
		const { bathroom, room, rooms, firestore, id } = this.props;
		const roomToUpd = rooms.filter(room => room.id === id);
		const updRoom = {
			...roomToUpd[0],
			bathroom: bathroomValue ? [...bathroom, bathroomValue] : [...bathroom],
			room: roomValue ? [...room, roomValue] : [...room]
		};
		firestore.update({ collection: "rooms", doc: id }, updRoom);
		this.setState(() => ({
			isBathroomAddItemClicked: false,
			isRoomAddItemClicked: false,
			bathroomValue: "",
			roomValue: ""
		}));
	};
	onValueChange = e => {
		const value = e.target.value;
		const name = e.target.name;
		this.setState(() => ({
			[name]: value
		}));
	};
	removeItem = (item, e) => {
		const { firestore, number, room, bathroom, id } = this.props;
		const updRoom = {
			number,
			room: room.filter(e => e !== item),
			bathroom: bathroom.filter(e => e !== item)
		};

		firestore.update({ collection: "rooms", doc: id }, updRoom);
	};
	removeRoom = () => {
		const { id, firestore } = this.props;
		firestore.delete({ collection: "rooms", doc: id });
	};
	addItemToRoom = e => {
		const currentColumn = e.currentTarget.id;
		currentColumn === "addToRoom"
			? this.setState(() => ({
					isRoomAddItemClicked: !this.state.isRoomAddItemClicked
			  }))
			: this.setState(() => ({
					isBathroomAddItemClicked: !this.state.isBathroomAddItemClicked
			  }));
	};
	render() {
		const { number, room, bathroom } = this.props;
		console.log(bathroom);
		const { isBathroomAddItemClicked, isRoomAddItemClicked } = this.state;
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
								{isBathroomAddItemClicked && (
									<form id="bathroom" onSubmit={this.onRoomSubmit}>
										<input
											className="addroom-input"
											name="bathroomValue"
											type="text"
											value={this.state.bathroomValue}
											onChange={this.onValueChange}
										/>
									</form>
								)}
							</ul>

							<button id="addToBathroom" onClick={this.addItemToRoom}>
								<i style={{ color: "green" }} className="fas fa-plus"></i>
							</button>
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
								{isRoomAddItemClicked && (
									<form id="room" onSubmit={this.onRoomSubmit}>
										<input
											className="addroom-input"
											name="roomValue"
											type="text"
											value={this.state.roomValue}
											onChange={this.onValueChange}
										/>
									</form>
								)}
							</ul>
							<button id="addToRoom" onClick={this.addItemToRoom}>
								<i style={{ color: "green" }} className="fas fa-plus"></i>
							</button>
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
