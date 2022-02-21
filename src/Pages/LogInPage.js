import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userLogIn } from "../ApiCrud/ApiCrud"
import Loader from "../Components/Utils/Loader/Loader"
import { toast } from "react-toastify"
import { isJwtExpired } from "jwt-check-expiration";

export default function LogInForm() {

    const navigate = useNavigate()

    const accessToken = localStorage.getItem('accessToken')

    const [inputValues, setInputValues] = useState({ email: "", password: "" })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        if(accessToken){
            if(isJwtExpired(accessToken)){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('tokenType')
                localStorage.removeItem('userType')
                localStorage.removeItem('email')
            }
            else{
                navigate("/dashboard")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function handleChange(e) {
        const { value, name } = e.target
        setInputValues(prevState => {
            return { ...prevState, [name]: value }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        let formData = new FormData();

        formData.append('username', inputValues.email)
        formData.append('password', inputValues.password)

        setIsLoading(true)

        userLogIn(formData)
            .then((res) => {
                localStorage.setItem('tokenType', res.data.token_type)
                localStorage.setItem('accessToken', res.data.access_token)
                localStorage.setItem('userType', res.data.user_type)
                localStorage.setItem('email', res.data.email)
                setIsLoading(false)
                window.location.href = "/"
            })
            .catch(e => {
                if(e.response){
                    if(e.response.status === 401){
                        console.log(e.response)
                        toast.error("ERROR: Incorrect username or password.")
                    }
                }
                else{
                    toast.error("ERROR: Something went wrong.")
                }
                setIsLoading(false)
            })
    }

    return (
        <form style={{ width: "92%", maxWidth: "450px", backgroundColor: "#e8e8e8", marginTop: "4em" }} className="p-3 mx-auto shadow border rounded" onSubmit={handleSubmit}>
            <h3 className="text-center mb-3">Log In</h3>
            <div className="form-group">
                <label htmlFor="log-in-email">Email</label>
                <input id="log-in-email"
                    type="text"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    value={inputValues.email}
                    onChange={handleChange}
                    required />
            </div>
            <div className="form-group">
                <label htmlFor="log-in-password">Password</label>
                <input id="log-in-password"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    minLength="8"
                    value={inputValues.password}
                    onChange={handleChange}
                    required />
            </div>
            {isLoading ? <Loader width="40px" height="40px" mt="2"/> : 
            <button style={{ display: "block" }} type="submit" className="mx-auto mt-2 btn btn-primary" disabled={inputValues.password.length < 8}>
                Log In
            </button>}
            <div className="mt-3 pt-3 mb-1" style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                <p className="text-center m-0">Don't have an account? <Link to="/sign-up" className="font-weight-bold">Sign up </Link></p>
            </div>
        </form>
    )
}