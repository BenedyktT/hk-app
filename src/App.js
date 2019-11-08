import React from "react";
import "./App.scss";
import Header from "./components/Header";
import Rooms from "./components/Rooms";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RoomDetail from "./components/RoomDetail";
import { Provider } from "react-redux";
import store from "./store";

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Header />

						<Switch>
							<Route path="/" exact component={Rooms} />
							<Route path="/rooms/:id" component={RoomDetail} />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
