import axios from "axios";
window.axios = axios
axios.defaults.baseURL = 'http://backend.dottore.uz/api/';
//axios.defaults.baseURL = 'http://localhost:8081/api/';

// default holatda token yaratib olish
let token;
if (localStorage.getItem('token') == null){
    token = null;
} else {
    token = 'Bearer ' + localStorage.getItem('token');
}

axios.defaults.headers.common['Authorization'] = token;
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';