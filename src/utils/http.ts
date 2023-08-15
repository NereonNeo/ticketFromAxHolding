import axios from "axios";

const instance = axios.create({
    baseURL: "https://ticketforax-io.onrender.com/api"
});

export default instance;