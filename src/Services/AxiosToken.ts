import axios from 'axios';
import store from '../Redux/Store';
const tokenAxios = axios.create();

tokenAxios.interceptors.request.use(req => {
  const token = store.getState().authReducer.loginResponse.token;
  
    req.headers = { 'Authorization': token }
    return req;
})


export default tokenAxios;