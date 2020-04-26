import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers/rootReducer';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import TopBar from './TopBar/TopBar.container';

let store = createStore(rootReducer, {}, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <TopBar />
    </Provider>
  );
}

export default App;
