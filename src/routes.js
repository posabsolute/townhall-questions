import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './App';
import Townhalls from './pages/townhalls';
import Questions from './pages/questions';
import Login from './pages/login';

const Routes = (props) => (
 <Router {...props}>
   <Route path="/" component={App}>
   		<Route path="/login" component={Login} />
		<Route path="/questions" component={Questions} />
       	<Route path="/townhalls" component={Townhalls} />
       	<Route path="*" component={Login} />
       	<IndexRoute component={Login}/>
   </Route>
  
 </Router>
);
export default Routes;