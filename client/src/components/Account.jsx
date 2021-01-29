import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';
import { useSelector } from 'react-redux';

import { fetchAccountById, updateAccount } from '../api/AccountApi';
import { insertNewTransaction } from '../api/TransactionApi';
import { fetchAllTransactionsByAccountId } from '../api/TransactionApi';
import Transaction from './Transaction';

const Account = () => {

    const user = useSelector(state => state.userState.user);
    const [account, setAccount] = useState();
    const [balance, setBalance] = useState();
    const [transType, setTransType] = useState();
    const [changes, setChanges] = useState();
    const [transaction, setTransactioin] = useState();
    const [tranList, setTranList] = useState();
    const [transferId, setTransferId] = useState();
    const formAmount = useRef(0.0);
    const { accountId } = useParams();

    useEffect(() => {
        console.log("accounntId", accountId)
        fetchAccountById(accountId).then(res => {
            setAccount(res.data);
            console.log("account:" , account);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        if (!account || account === undefined) return ;
        updateAccount(account).then(res => {
            setAccount(res.data);
            console.log("changes", changes);
            setTransactioin({
                amount: changes,
                user_id : user.user_id,
                account_id: account.account_id,
                type: transType,
            })
        }).catch(err => console.log(err));
    }, [balance])

    useEffect(() => {
        if (transaction && transaction.amount !== undefined) {
        insertNewTransaction(transaction).then(() => {
            fetchAllTransactionsByAccountId(account.account_id).then(res => {
                setTranList(res.data);
            })
        }).catch(err => console.log(err))
    }
    }, [transaction])

    const onClickWithdraw = () => {
        setChanges(Number.parseFloat(formAmount.current.value));
        if (!changes || isNaN(changes) || changes > account.balance) return ;
        setTransType("Withdraw");
        setAccount({
            ...account,
            balance: account.balance - changes
        });
        setBalance(account.balance);
    }

    const onClickDeposit = () => {
        setChanges(Number.parseFloat(formAmount.current.value));
        if (!changes || isNaN(changes)) return ;
        console.log("deposit", account);
        setTransType("Deposit");
        setAccount({
            ...account,
            balance: account.balance + changes
        });
        setBalance(account.balance);
    }

    const onChangeTransferId = (e) => {
        const id = Number.parseInt(e.target.value);
        if (!id || isNaN(id)) setTransferId(0);
        setTransferId(id);
    }

    const onClickTransfer = () => {
        setChanges(Number.parseFloat(formAmount.current.value));
        if (!transferId || isNaN(transferId)) return ;
        if (!changes || isNaN(changes) || changes > account.balance) return ;
        setTransType(`Transfer To Account: ${transferId}`);
        fetchAccountById(transferId).then(res => {
            console.log(res.data);
            setAccount({
                ...account,
                balance: account.balance - changes
            });
            res.data.balance = res.data.balance + changes;
            updateAccount(res.data).then(sucess => {
                console.log(sucess);
            })
            setBalance(account.balance);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="shadowed-box">
            {account &&
                <div>
                    <Row>
                        <Col>
                            <h2>{`Account Id: ${account.account_id}`}</h2>
                            <h5>{`Balance: $${account.balance}`}</h5>
                        </Col>
                        <Col>
                            <h4>{account.type}</h4>
                            {/* <h5>{account.create_date}</h5> */}
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                        <Col>
                            <Button 
                                onClick={onClickWithdraw} 
                                variant="outline-info">
                                    Withdraw
                            </Button>
                        </Col>
                        <Col>
                            <Button 
                                onClick={onClickDeposit} 
                                variant="outline-info">
                                    Deposit
                            </Button>
                        </Col>
                    </Row>
                    <hr></hr>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                            <InputGroup.Text>0.00</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            ref={formAmount}
                            placeholder="Enter amount"
                            aria-label="Amount (to the nearest dollar)"
                        />
                    </InputGroup>
                    <hr></hr>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <Button 
                                onClick={onClickTransfer}
                                variant="outline-info">
                                    Transfer
                            </Button>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Account Id Transfer to"
                            aria-describedby="basic-addon1"
                            value={transferId}
                            onChange={onChangeTransferId}
                        />
                    </InputGroup>

                <Transaction tranList={tranList}/>
                <Link id="back-to-user" to="/user"><BiArrowBack/></Link>
                </div>
            }
        </div>
    );
}

export default Account;