import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-c7fab.firebaseio.com/'
})

export default instance;