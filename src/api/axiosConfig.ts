import axios from "axios";

const instance = axios.create();

instance.defaults.baseURL = "http://localhost:1217/";

export default instance;
