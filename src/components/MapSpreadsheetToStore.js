import React, { Component } from "react";
import Tabletop from "tabletop";
import uuid from "uuid";
import { connect } from "react-redux";
import { getRooms } from "../actions/roomActions";
//ya29.Il-vB4PQBDfHWBo9oWL88-FiZrDp9eUXQRWSDlILAqrZXb18hj-zqM3DfnMRfIIMqxybhVWm6aZ7cGCeWjEC6W2TXbvEWEyo1DB3ap4S_-3pl_sulSf6-FRgKyjJ_CLGyQ

class MapSpreadsheetToStore extends Component {
	state = {
		reportData: []
	};
	componentDidMount() {
		this.getReport();
	}

	getReport() {
		let reportData;
		Tabletop.init({
			key:
				"https://docs.google.com/spreadsheets/d/1VNSbty91bi83frVi3GQlmgnxiCLDKmAxA8ys3AVZ-Oc/edit?usp=sharing",
			simpleSheet: true
		})
			.then((data, tabletop) => {
				reportData = data.map(
					({
						Room: number,
						Roomstatus: roomStatus,
						Status: resStatus,
						"Room Notes": cleaningNote
					}) => {
						return {
							number,
							roomStatus,
							resStatus,
							cleaningNote,
							isCheckedOut: false,
							id: uuid()
						};
					}
				);
				return this.setState(() => ({ reportData }));
			})
			.then(() => {
				this.mapStateToStore();
			});
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	mapStateToStore() {
		this.props.getRooms(this.state.reportData);
	}

	render() {
		return <div></div>;
	}
}
export default connect(
	null,
	{ getRooms }
)(MapSpreadsheetToStore);
