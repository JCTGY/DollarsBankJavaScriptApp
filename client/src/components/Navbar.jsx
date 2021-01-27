import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import User from './User';
import Account from './Account';
import History from './History';
import Login from './Login';
import SignIn from "./SignIn";
import SignUp from './SignUp';
import PrivateRoute from './PrivateRoute';

const NavBar = props => {
    const user = useSelector(state => state.userState.user);
    
    return (
        <Router>
            <div className="NavBar">
                <Link to="/"><h2>DollarBank</h2></Link>
                <Link to="/user">User</Link>
                <Link to="/account">Account</Link>
                <Link to="/history">History</Link>
                <Login/>
            </div>

            <Switch>
                <Route exact path="/">
                    <div className="img-wrapper">
                        <Link id="home" to="/signIn">LogIn</Link>
                    </div>
                </Route>
                <PrivateRoute
                    component={User}
                    authed={user.auth} 
                    path="/user" 
                    exact
                />
                <PrivateRoute 
                    component={Account}
                    authed={user.auth} 
                    path="/account" 
                    exact
                />
                <PrivateRoute 
                    component={History}
                    authed={user.auth} 
                    path="/history" 
                    exact
                />      
                <Route path="/signIn">
                    <SignIn/>
                </Route>
                <Route path="/signUp">
                    <SignUp/>
                </Route>
            </Switch>

        </Router>
    )
}

export default NavBar;