import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import { fetchAllTransactionsByAccountId } from '../api/TransactionApi';

const Transaction = ({ accountId }) => {

    const [transaction, setTransaction] = useState();

    useEffect(() => {
        fetchAllTransactionsByAccountId(accountId).then(res => {
            setTransaction(res.data);
        })
    }, []);

    const transactionList = transaction && transaction.map(t => {
        return (
            <tr key={t.transaction_id}>
                <td>{t.type}</td>
                <td>{t.amount}</td>
                <td>{t.create_date}</td>
            </tr>
        );
    })
    return (
        <div>
            <hr></hr>
            {(transaction && transaction.length !== 0) &&
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionList}
                    </tbody>
                </Table>
            }
        </div>
    );
}

export default Transaction;