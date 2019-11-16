import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import {
	createInputElement,
	onBathroomChange,
	onRoomChange
} from "../actions/maintainceActions";
import { connect } from "react-redux";
import FormInput from "./FormInput";
import { compose } from "redux";

class AddRoom extends Component {
	state = {
		number: ""
	};
	onBathroomChange = e => {
		const targetValue = e.target.value;
		this.props.onBathroomChange(targetValue);
	};
	onRoomChange = e => {
		const targetValue = e.target.value;
		this.props.onRoomChange(targetValue);
	};
	createInputElement = e => {
		e.preventDefault();
		const inputType = e.currentTarget.id;
		this.props.createInputElement(inputType);
	};
	onAddRoom = e => {
		const { firestore, history, bathroomArr, roomArr } = this.props;
		const { number } = this.state;
		e.preventDefault();
		const bathroom = Object.values(bathroomArr);
		const room = Object.values(roomArr);
		const newRoom = {
			bathroom,
			number,
			room
		};
		firestore.add({ collection: "rooms" }, newRoom).then(() => {
			history.push("/maintaince");
		});
	};
	render() {
		return (
			<div>
				<h1>Add Room</h1>
				<form onSubmit={this.onAddRoom} className="add-room">
					<div className="form-group form-group__number">
						<label htmlFor="number">Number: </label>
						<input
							min="3"
							max="417"
							placeholder="room"
							value={this.state.number}
							onChange={e => {
								const number = e.target.value;
								this.setState(() => ({ number }));
							}}
							type="number"
							name="number"
						/>
					</div>
					<div className="form-group form-group__bathroom">
						<label htmlFor="room">Room list: </label>
						{this.props.roomInputs.map(input => (
							<FormInput
								onInputChange={this.onRoomChange.bind(this)}
								value={this.state.bathroomListValue}
								key={input}
								name="room"
								keyValue={input}
							/>
						))}
						{
							<button id="roomInputs" onClick={this.createInputElement}>
								<i style={{ color: "green" }} className="fas fa-plus"></i>
							</button>
						}
					</div>
					<div className="form-group form-group__room">
						<label htmlFor="bathroom">Bathroom list: </label>
						<div className="bathroom-inputs">
							{this.props.bathroomInputs.map(input => (
								<FormInput
									onInputChange={this.onBathroomChange.bind(this)}
									value={this.state.roomListValue}
									key={input}
									name="bathroom"
									keyValue={input}
								/>
							))}{" "}
						</div>
						<button id="bathroomInputs" onClick={this.createInputElement}>
							<i style={{ color: "green" }} className="fas fa-plus"></i>
						</button>
					</div>
					<input
						className="btn btn-color add-room__submit"
						type="submit"
						value="Add room"
					/>
				</form>
			</div>
		);
	}
}

export default compose(
	firestoreConnect(() => [{ collection: "rooms" }]),
	connect(
		state => ({
			bathroomInputs: state.maintainceActionsReducer.bathroomInputs,
			roomInputs: state.maintainceActionsReducer.roomInputs,
			bathroomValue: state.maintainceActionsReducer.bathroomValue,
			roomValue: state.maintainceActionsReducer.roomValue,
			bathroomArr: state.maintainceActionsReducer.bathroomArr,
			roomArr: state.maintainceActionsReducer.roomArr
		}),
		{ createInputElement, onBathroomChange, onRoomChange }
	)
)(AddRoom);
