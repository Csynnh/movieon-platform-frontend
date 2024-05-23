import axios from 'axios';

const instance = axios.create();
instance.defaults.baseURL = 'https://movieon-platform-backend.onrender.com/';
// instance.defaults.baseURL = 'http://localhost:1217/';

export default instance;
