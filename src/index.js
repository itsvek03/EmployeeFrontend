import React from 'react';
import ReactDOM from 'react-dom';
import reducers from '../src/store/index.js'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
const middlewares = [thunk];

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middlewares))
);


ReactDOM.render(
<Provider store={store}>
  <App/>
</Provider>,document.getElementById('root'));


