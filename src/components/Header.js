import React from "react";
import logo from "../images/HL_logo_new.png";
import moment from "moment";

export default function Header(props) {
	return (
		<nav className="nav">
			<div className="nav__brand">
				<img style={imageStyles} src={logo} alt="" />
			</div>
			<div className="date">{moment().format("Do MMMM")}</div>
		</nav>
	);
}

const imageStyles = {
	display: "block",
	height: "50px",
	cursor: "pointer"
};
