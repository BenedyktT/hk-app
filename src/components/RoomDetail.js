import React, { Component } from "react";
import { Context, AppProvider } from "./context";

export default class RoomDetail extends Component {
	render() {
		return (
			<AppProvider>
				<Context>
					{value => {
						return <div className="">{console.log(value.rooms)}</div>;
					}}
				</Context>
			</AppProvider>
		);
	}
}
