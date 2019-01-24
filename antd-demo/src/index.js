import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter , Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore , applyMiddleware} from 'redux';
import {Reducer} from './Redux/Reducer';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import {rootSaga} from './Sagas/Saga';
import  jwtDecode from 'jwt-decode';
import setAuthJwt from './utils/setAuthJwt';


const sagaMiddleware =  createSagaMiddleware();

const store = createStore(Reducer, 
				composeWithDevTools(
  				applyMiddleware(sagaMiddleware)));
		//		applyMiddleware(sagaMiddleware));


sagaMiddleware.run(rootSaga);

if(localStorage.jwtToken){
		setAuthJwt(localStorage.jwtToken);
		var decode = jwtDecode(localStorage.jwtToken);
		store.dispatch({type:'SET_CURRENT_USER',user:decode});
		//store.dispatch({type:"SET_NEXT_CLIENT_ID",nextClientId : "ABC123"})
}


ReactDOM.render( ( 
				 	<Provider store={store}>
						<BrowserRouter>
							<App/>
						</BrowserRouter>
					</Provider>	), document.getElementById('root'));


serviceWorker.unregister();
