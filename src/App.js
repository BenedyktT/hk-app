import React from "react";
import "./App.scss";
import Header from "./components/Header";
import Rooms from "./components/Rooms";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Maintaince from "./components/Maintaince";
import RoomDetail from "./components/RoomDetail";
import Home from "./components/Home";
import { rrfProps } from "./store";
import { fetchRooms } from "./actions/roomActions";
import { connect } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import ItemDetails from "./components/ItemDetails";
import AddRoom from "./components/AddRoom";

class App extends React.Component {
	componentDidMount() {}
	render() {
		return (
			<ReactReduxFirebaseProvider {...rrfProps}>
				<Router>
					<div className="App">
						<Header />
						<Switch>
							{/* 	<Route path="/" exact component={Home} /> */}

							<Route path="/" exact component={Maintaince} />
							<Route path="/report" exact component={Rooms} />
							<Route path="/rooms/:id" component={RoomDetail} />
							<Route path="/add/room" component={AddRoom} />
							<Route path="/:roomid/:itemid" component={ItemDetails} />
						</Switch>
					</div>
				</Router>
			</ReactReduxFirebaseProvider>
		);
	}
}

export default connect(null, {
	fetchRooms
})(App);
