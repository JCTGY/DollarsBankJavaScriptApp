import axios from 'axios';

const accountBaseUrl = 'http://localhost:5000/account';

export const fetchAllAccountsByUserId = (user_id) => {
    console.log("user_id", user_id)
    return axios.get(`${accountBaseUrl}?userId=${user_id}`);
}

export const fetchAccountById = (accountId) => {
    return axios.get(`${accountBaseUrl}/${accountId}`);
} 

export const updateAccount = (account) => {
    return axios.put(`${accountBaseUrl}`, account);
}