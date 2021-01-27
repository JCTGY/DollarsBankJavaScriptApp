import axios from 'axios';


const UserBaseUrl = 'http://localhost:5000/user';

export const signInUser = (user) => {
    return axios.post(`${UserBaseUrl}/signIn`, user);
}