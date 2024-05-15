import axios from "axios";

const instance = axios.create();

instance.defaults.baseURL = "https://movieon-platform-backend.onrender.com/";

export default instance;
