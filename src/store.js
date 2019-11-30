import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { createFirestoreInstance } from "redux-firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "hkapp-257620.firebaseapp.com",
  databaseURL: "https://hkapp-257620.firebaseio.com",
  projectId: "hkapp-257620",
  storageBucket: "hkapp-257620.appspot.com",
  messagingSenderId: "257818188983",
  appId: "1:257818188983:web:26a1e75a990e68c83f8132",
  measurementId: "G-9TCRCQH4FK"
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const initialState = {};

const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    /* 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
  )
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

export default store;
