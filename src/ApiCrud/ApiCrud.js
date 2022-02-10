import axios from "axios"
import { toast } from "react-toastify"
import history from "../RouterSetup/historyObj"

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
            toast.info("Session expired or user not logged in. Log in to continue.")
            history.push('/')
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

// LOG OUT
export function userLogOut(){
    localStorage.removeItem('accessToken')
    localStorage.removeItem('tokenType')
    localStorage.removeItem('userType')
    window.location.href = "/"
}

// GET USER DATA
export function getUserData(){
    return api.get('api/user/me')
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

// GET ALL PROJECTS
export function getAllProjects(){
    return api.get('api/project/all')
}

// CREATE NEW PROJECT
export function createNewProject(data){
    return api.post(`api/project/create`, data)
}

// GET PROJECT DETAILS
export function getProjectDetails(param){
    return api.get(`api/project/details/${param}`)
}

// REGISTER FOR PROJECT
export function registerForProject(param){
    return api.post(`api/project/register/${param}`)
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzaHViaEBleGFtcGxlLmNvbSIsImV4cCI6MTY0NDM0NTAyNH0.op156C6z0z8RY06UliKmKtun6HV9jtUJavkOJG43ck8