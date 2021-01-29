import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';


const Transaction = ({ tranList }) => {

    // const [transaction, setTransaction] = useState();

    // useEffect(() => {
    //     fetchAllTransactionsByAccountId(accountId).then(res => {
    //         setTransaction(res.data);
    //     })
    // }, []);

    const transactionList = tranList && tranList.map(t => {
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
            {(tranList && tranList.length !== 0) &&
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