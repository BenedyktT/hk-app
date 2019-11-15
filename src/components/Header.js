import React from "react";
import logo from "../images/HL_logo_new.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Header extends React.Component {
	state = {
		roomsToClean: [],
		amountToClean: []
	};
	static getDerivedStateFromProps(props, state) {
		if (props.rooms) {
			return { roomsToClean: props.rooms };
		}
		return null;
	}
	componentDidUpdate() {}

	render() {
		const roomsToClean = this.state.roomsToClean.reduce((acc, current) => {
			if (current.roomStatus === "Not Clean") {
				acc.push(current.number);
				return acc;
			} else {
				return acc;
			}
		}, []);

		return (
			<nav className="nav">
				<div className="nav__brand">
					<Link to="/">
						<img style={imageStyles} src={logo} alt="" />
					</Link>
				</div>
				{roomsToClean.length ? (
					<div className="div">{roomsToClean.length} rooms to clean</div>
				) : null}
				<div className="date">{moment().format("Do MMMM")}</div>
			</nav>
		);
	}
}

const imageStyles = {
	display: "block",
	height: "50px",
	cursor: "pointer"
};

export default connect(
	state => ({ rooms: state.roomActionsReducer.rooms }),
	null
)(Header);
