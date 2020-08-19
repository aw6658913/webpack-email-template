import React from 'react';
import menu from '@router/router.web';
import ActionCircle from '@component/ActionCircle';
import './layout.less';
import logo from '@images/logo.png';

class Layout extends React.Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }

    render() {
        const getMenu = data => {
            return data.map((item, index) => {
                return (
                    <li key={index}>
                        <a className="layoutLink" target="_blank" href={item.url}>{item.name}</a> 
                    </li>
                )
            })
        }

        const { children } = this.props;

        return (
            <div className="layoutMain">
                <div className="layoutMainLeft">
                    <div className="layoutLogoMain">
                        <img className="layoutLogo" src={logo} />
                        <span className="layoutLogoText">VV EMAIL</span>
                    </div>
                    <ul>
                        {
                            menu && menu.length?getMenu(menu):null
                        }
                    </ul>
                </div>
                <div className="layoutMainRight">
                    <ActionCircle />
                    Welcome
                </div>
            </div>
        )
    }
}

export default Layout;