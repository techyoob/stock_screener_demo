import axios from 'axios';

const baseURL = "localhost"


const queryHandler = () => {
    
    return axios.create({
        baseURL: baseURL
    });
};

export default queryHandler;