import React, {Component} from 'react';                                 //  Get react       
import { NavLink, Redirect } from "react-router-dom";                   //  Get Navlink for routing
import './Header.css';

class Header extends Component {
    render = () => {
        return (
            <div className="Header-wrapper">
                <nav>
                    <ul className="Header-links-wrapper">
                        <Redirect to='/account'/>
                        <li><NavLink to='/account' style={{ textDecoration: 'none', color: '#000000',  padding: '10px 50px' }}>Account</NavLink></li>
                        <li><NavLink to ='/stock' style={{ textDecoration: 'none', color: '#000000', padding: '10px 50px' }}>Stock</NavLink></li>
                    </ul>
                </nav>
                <div className="Header-image-wrapper">
                    <img src={'/assets/bank-LOGO.png'} alt="bank logo" style={{width: 100}}/> 
                </div>
            </div>
        )
    }
}

export default Header;