import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Tools from './pages/Tools';
import registerServiceWorker from './registerServiceWorker';

const Root = () => (
	<Router basename="/reactivemaps">
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/learn" component={Learn} />
			<Route exact path="/tools" component={Tools} />
		</Switch>
	</Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
