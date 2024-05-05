import axios from "axios";

export default axios.create({
  baseURL: "https://movieon-platform-backend.onrender.com/",
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});
