import axios from "axios";

const instance = axios.create();

// api in env
instance.defaults.baseURL = process.env.REACT_APP_API_GATEWAY_URL;

export default instance;
