import React from 'react';
import ReactDom from 'react-dom';
import Layout from '@component/Layout';
// import setRouter from '@router/router';
import './base.less';
import logo from '@images/logo.png';

if(module.hot) {
    module.hot.accept();
}


const App = () => {
    return (
        <>
            <Layout />
        </>
    )
}

ReactDom.render(<App />, document.getElementById('root'));