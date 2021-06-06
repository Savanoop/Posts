import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';import './index.css';
// import App from './App';
import Routes from './Routes/Routes';

ReactDOM.render(
 <Provider store={configureStore()}>
    <Routes />
 </Provider>,
 document.getElementById('root')
);
