import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter , Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore , applyMiddleware} from 'redux';
import {Reducer} from './Redux/Reducer';
import {ClientReducer} from './Redux/ClientReducer';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import {rootSaga} from './Sagas/Saga';
import  jwtDecode from 'jwt-decode';
import setAuthJwt from './utils/setAuthJwt';
import {combineReducers} from 'redux';
import {fromJS} from 'immutable';
import rootReducer  from './Redux/RootReducer';



//var rootReducer = combineReducers({ red: Reducer, green:ClientReducer})

const sagaMiddleware =  createSagaMiddleware();

const store = createStore(rootReducer,
				fromJS({}),
				composeWithDevTools(
  				applyMiddleware(sagaMiddleware)));
	

sagaMiddleware.run(rootSaga);

if(localStorage.jwtToken){
		setAuthJwt(localStorage.jwtToken);
		var decode = jwtDecode(localStorage.jwtToken);
		store.dispatch({type:'SET_CURRENT_USER',user:decode});
		
}


ReactDOM.render( ( 
				 	<Provider store={store}>
						<BrowserRouter>
							<App/>
						</BrowserRouter>
					</Provider>	), document.getElementById('root'));


serviceWorker.unregister();
