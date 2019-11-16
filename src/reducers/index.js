import { combineReducers } from "redux";
import roomActionsReducer from "./roomActionsReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { maintainceActionsReducer } from "./maintainceActionsReducer";

export default combineReducers({
	roomActionsReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	maintainceActionsReducer
});
