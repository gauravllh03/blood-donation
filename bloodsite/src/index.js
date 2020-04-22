import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';

import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';





const composeEnhancers =process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose;
const store=createStore(authReducer,composeEnhancers(applyMiddleware(thunk)));

const app=(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
