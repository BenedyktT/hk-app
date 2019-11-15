import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";

import FormInput from "./FormInput";

class AddRoom extends Component {
	state = {
		roomInputs: [],
		bathroomInputs: [],
		number: "",
		bathroomValue: "",
		roomValue: "",
		bathroomArr: "",
		roomArr: ""
	};
	onBathroomChange = e => {
		const targetName = e.target.name;
		const targetValue = e.target.value;
		this.setState(state => {
			return {
				bathroomValue: targetValue,
				bathroomArr: { ...state.bathroomArr, targetValue }
			};
		});
	};
	onRoomChange = e => {
		const targetValue = e.target.value;
		const targetName = e.target.name;
		this.setState(state => {
			return {
				roomValue: targetValue,
				roomArr: { ...state.roomArr, [targetName]: targetValue }
			};
		});
	};
	createInputElement = e => {
		e.preventDefault();
		const inputType = e.currentTarget.id;
		this.setState(state => ({
			[inputType]: [...state[inputType], `input-${state[inputType].length}`]
		}));
	};
	onAddRoom = e => {
		const { firestore, history } = this.props;
		const { number, bathroomArr, roomArr } = this.state;
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
				<form onSubmit={this.onAddRoom} className="add-room">
					<div className="form-group form-group__number">
						<label htmlFor="number">Number: </label>
						<input
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
						{this.state.roomInputs.map(input => (
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
							{this.state.bathroomInputs.map(input => (
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

export default firestoreConnect(() => [{ collection: "rooms" }])(AddRoom);
