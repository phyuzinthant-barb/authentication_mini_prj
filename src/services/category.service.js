import axios from 'axios';
import authHeader from '../utils/auth-header';

const API_URL = 'http://192.168.1.17:8080/api/category';

const getCategoryList = () => {
  return axios.get(API_URL, {headers: authHeader()});
};

const categoryService = {
  getCategoryList,
};

export default categoryService;
