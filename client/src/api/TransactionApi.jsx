import axios from 'axios';

const transactionBaseUrl = 'http://localhost:5000/transaction';

export const fetchAllTransactionsByAccountId = accountId => {
    return axios.get(`${transactionBaseUrl}?accountId=${accountId}`);
}

export const insertNewTransaction = transaction => {
    return axios.post(`${transactionBaseUrl}`, transaction);
}