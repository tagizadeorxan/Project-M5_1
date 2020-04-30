import React, {Component} from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom"
import Account from './Components/Account/Account';
import Stock from './Components/Stock/Stock';
import Balance from './Components/Balance/Balance';
import './index';
import Buy from './Components/Buy/Buy';

class Application extends Component {
    render() {
        return (
            <Router>

            <NavLink to='/account'>Account</NavLink>
            <NavLink to ='/stock'>Stock</NavLink>
    

            <Route exact path='/account'><Account/></Route>
            <Route exact path='/stock'><Stock/></Route>
            
           <Route exact path='/stock/:id' component={Buy}></Route> 

            <Balance/>

            </Router>
        )
    }
}

export default Application;