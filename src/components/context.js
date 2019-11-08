import React, { Component } from "react";
const MyContext = React.createContext();
const reducer = (state, action) => {
	switch (action.type) {
		case "MAP_REPORT":
			return {
				...state,
				rooms: [...state.rooms, ...action.payload]
			};

		case "SET_CLEAN":
			return state.rooms.find(element =>
				element.id === action.payload ? (element.roomStatus = "Ready") : null
			);
		case "UNSET_CLEAN":
			return state.rooms.find(element =>
				element.id === action.payload
					? (element.roomStatus = "Not Clean")
					: null
			);
		case "TOGGLE_CHECKOUT":
			state.rooms.map(room => {
				return action.payload === room.id
					? (room.isCheckedOut = !room.isCheckedOut)
					: { ...state };
			});
			return {
				...state
			};
		default:
			return state;
	}
};
export class AppProvider extends Component {
	state = {
		rooms: [],
		dispatch: action => this.setState(state => reducer(state, action))
	};
	render() {
		return (
			<MyContext.Provider value={this.state}>
				{this.props.children}
			</MyContext.Provider>
		);
	}
}

export const Context = MyContext.Consumer;
