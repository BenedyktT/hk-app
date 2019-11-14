import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="home-container">
			<Link to="/report" className="btn btn-color">
				Housekeeping report
			</Link>
			<Link to="/maintaince" className="btn btn-color">
				<button className="btn btn-color">Maintaince report</button>
			</Link>
		</div>
	);
}
