import React from 'react';
import Layout from '@component/Layout';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import index from '@pages/index';
import fileManage from '@pages/fileManage';
import category from '@pages/category';
const setRouter = () => (<Router><div><Layout><Switch>
<Route exact path='/' component={index}/>
<Route exact path='/fileManage' component={fileManage}/>
<Route exact path='/category' component={category}/>
</Switch></Layout></div></Router>);
export default setRouter;