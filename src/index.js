import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import './index.css';
import App from './App';
import Learn from './Learn';
import Tools from './Tools';
import registerServiceWorker from './registerServiceWorker';

const Root = () => (
    <Router>
        <Fragment>
            <Route exact path="/" component={App} />
            <Route exact path="/learn" component={Learn} />
            <Route exact path="/tools" component={Tools} />
        </Fragment>
    </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
