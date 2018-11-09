import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { reducer as tmReducer, STATE_KEY as TM_STATE_KEY } from './components/TMContainer'

const rootReducer = combineReducers({
  [TM_STATE_KEY]: tmReducer,
})

const middleware = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk)) :
  applyMiddleware(thunk);

const store = createStore(rootReducer, middleware)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
