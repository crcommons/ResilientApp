import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import { AppContainer as HotReloadContainer } from 'react-hot-loader'

import App from './App';

// Import main SASS file
import './assets/styles/main.css'

const render = () => {
  ReactDOM.render((
    <HotReloadContainer>
      <Router history={browserHistory}>
        <Route path="/" component={App}/>
      </Router>
    </HotReloadContainer>
  ), document.getElementById('root'))
};

render();

module.hot.accept('./App', render);