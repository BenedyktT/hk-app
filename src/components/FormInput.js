import React from "react";

export default function FormInput(props) {
	const onChange = ev => props.onInputChange(ev);
	return (
		<input
			onChange={onChange.bind(this)}
			value={props.value}
			type="text"
			name={props.keyValue}
		/>
	);
}
