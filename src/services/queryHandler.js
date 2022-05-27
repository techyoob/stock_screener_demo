import axios from 'axios';

const baseURL = process.env.REACT_APP_GASS_USERS_API


// TODO:
// make this service generic to all api calls and wrap it over react query

const queryHandler = () => {
    
    return axios.create({
        baseURL: baseURL
    });
};

export default queryHandler;