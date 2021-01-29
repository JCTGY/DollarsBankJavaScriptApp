import axios from 'axios';


const userBaseUrl = 'http://localhost:5000/user';

export const signInUser = (user) => {
    return axios.post(`${userBaseUrl}/signIn`, user);
}