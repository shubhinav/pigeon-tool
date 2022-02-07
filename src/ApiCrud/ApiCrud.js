import axios from "axios"
import { toast } from "react-toastify"

export const baseUrl = 'http://localhost:8000/'
const tokenType = localStorage.getItem('tokenType')
const accessToken = localStorage.getItem('accessToken')

export const api = axios.create({
    baseURL: baseUrl,
    headers: {"Authorization": `${tokenType} ${accessToken}`}
});

api.interceptors.response.use( (res) => {
    return res;
  }, (e) => {
        if(e.response.status === 401){
            window.location.href = "/"
            toast.info("Session expired. Log in to continue.")
        }
        else{
            toast.error("There was an error")
        }
    return Promise.reject(e);
  });

// SIGN UP
export function userSignUp(data){
    return axios.post(`${baseUrl}api/user/signup`, data)
}

// LOG IN
export function userLogIn(data){
    return axios.post(`${baseUrl}api/user/login`, data)
}

// CHANGE PASSWORD
export function changePassword(param){
    return api.post(`api/user/change-password/${param}`)
}

// CHANGE USERNAME
export function changeUsername(param){
    return api.post(`api/user/change-username/${param}`)
}

// ADD ANY USER (BY ADMIN)
export function addAnyUser(data){
    return api.post(`api/user/add-user`, data)
}

// CHANGE USER PASSWORD (BY ADMIN)
export function changeUserPassword(data){
    return api.post(`api/user/change-forgot-password`, data)
}