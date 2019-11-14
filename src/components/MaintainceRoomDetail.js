import React, { Component } from "react";

export default class MaintainceRoomDetail extends Component {
	state = {
		isDetailsClicked: false
	};
	render() {
		const { number, room, bathroom } = this.props;
		return (
			<div className="room-detail">
				<ul className="room-detail__elements">
					<li className="danger">
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
				</ul>
				{this.state.isDetailsClicked && (
					<div className="maintaince">
						<div className="bathroom-col col">
							<h5>Bathroom</h5>
							<ul className="bathroom-col col">
								{bathroom.map((e, index) => (
									<li key={index}>
										{e}{" "}
										<button>
											<i className="fas fa-backspace danger-color"></i>
										</button>
									</li>
								))}
							</ul>
						</div>

						<div className="bathroom-col col">
							<h5>Room</h5>
							<ul className="bathroom-col col">
								{room.map((e, index) => (
									<li key={index}>
										{e}{" "}
										<button>
											<i className="fas fa-backspace danger-color"></i>
										</button>
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
			</div>
		);
	}
}
