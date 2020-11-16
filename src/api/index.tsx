import axios from 'axios';

export default axios.create({
    baseURL: `https://warren-transactions-api.herokuapp.com/api/`
});
