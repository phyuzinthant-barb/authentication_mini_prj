import axios from 'axios';
import authHeader from '../utils/auth-header';

const API_URL = 'https://test-api-blog.znova.one/';

const getUserList = () => {
 return axios.get(API_URL + 'user', { headers: authHeader() });
};

const userService = {
 getUserList,
};

export default userService;
