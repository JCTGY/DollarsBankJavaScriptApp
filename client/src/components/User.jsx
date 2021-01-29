import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

import { fetchAllAccountsByUserId } from '../api/AccountApi';


const User = () => {

    const user = useSelector(state => state.userState.user);

    const [accounts, setAccounts] = useState();

    const accountsList = accounts && accounts.map(a => {
        return (
            <tr key={a.account_id}>
                <td>{a.account_id}</td>
                <td>{`$${a.balance}`}</td>
                <td>{a.type}</td>
                <Link to={`account/${a.account_id}` } className="btn btn-outline-info">View</Link>
            </tr>
        );
    })
    useEffect(() => {
        console.log(user.user_id);
        fetchAllAccountsByUserId(user.user_id).then(res => {
            setAccounts(res.data);
        })
    }, []);

    return (
        <div className="shadowed-box">
            <h1>{`Welcom ${user.first_name}!`}</h1>
            <hr></hr>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>balance</th>
                        <th>account type</th>
                    </tr>
                </thead>
                <tbody>
                    {accountsList}
                </tbody>
            </Table>
        </div>
    );
}

export default User;