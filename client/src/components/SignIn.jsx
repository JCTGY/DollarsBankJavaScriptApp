import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Form, Alert, Row } from 'react-bootstrap';

import './Login.css';
import { signInUser } from '../api/UserApi';

const SignIn = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const triggerQtyWarning = () => {
        setVisibleAlert(true)
        setTimeout(() => {
            setVisibleAlert(false)
        }, 2000);
    }

    const onClickSignIn = (e) => {
        e.preventDefault();
        signInUser(user)
            .then(res => {
                console.log("user: " + res.data);
                dispatch({ type: 'SIGNIN', payload: res.data })
                history.push("/products");
            }).catch(err => {
                console.log(user);
                triggerQtyWarning();
                console.log(err);
            })
    }

    const onChangeUser = ({ target: { name, value } }) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    return (
        <div className="shadowed-box">
            <Alert show={visibleAlert} variant='danger'>
                Invalid Password or Username
            </Alert>
            <Form>
                <Form.Group controlId="signInUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        onChange={onChangeUser}
                        name="username"
                    />
                </Form.Group>
                <Form.Group controlId="signInPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={onChangeUser}
                        name="password"
                    />
                </Form.Group>
                <label>Don't have a account? <Link to="/signUp">SignUp</Link></label>
                <Row>
                    <a onClick={onClickSignIn} className="main-btn" id="login-btn">
                        Submit
                        </a>
                </Row>
           
            </Form>


        </div>


    );
}

export default SignIn;