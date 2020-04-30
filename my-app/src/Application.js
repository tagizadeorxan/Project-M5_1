import React, {Component} from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom"
import Account from './Components/Account/Account';
import Stock from './Components/Stock/Stock';



class Application extends Component {
    render() {
        return (
            <Router>

            <NavLink to='/account'>Account</NavLink>
            <NavLink to ='/stock'>Stock</NavLink>
    

            <Route exact path='/account'><Account/></Route>
            <Route exact path='/stock'><Stock/></Route>
            
            {/* <Route exact path='/stock/:id' component={Buy}></Route> */}

            <p>balance: 1000</p>

            </Router>
        )
    }
}

export default Application;