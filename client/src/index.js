import React from 'react';
import  ReactDOM  from 'react-dom/client';
import  {Provider} from 'react-redux';
import {legacy_createStore as createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';

import '../src/index.css';
import App from './App';
import reducers from './reducers'


const root = ReactDOM.createRoot(document.getElementById('root'));

const Store =  createStore(reducers, compose(applyMiddleware(thunk)));

root.render(<Provider store={Store}><App/></Provider>);


