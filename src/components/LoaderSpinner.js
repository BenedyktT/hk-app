import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { usePromiseTracker } from "react-promise-tracker";

export default function LoaderSpinner(props) {
	const { promiseInProgress } = usePromiseTracker();

	return <div>{promiseInProgress ? <h1>promise in progress</h1> : null}</div>;
}
