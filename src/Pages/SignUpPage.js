import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userSignUp } from "../ApiCrud/ApiCrud"
import Loader from "../Components/Utils/Loader/Loader"
import { toast } from "react-toastify"

export default function SignUpForm() {

    const accessToken = localStorage.getItem('accessToken')

    let navigate = useNavigate()

    const [inputValues, setInputValues] = useState({ user_name: "", email: "", password: "", confirm_password: "" })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        if(accessToken){
            navigate("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleChange(e) {
        const { value, name } = e.target
        setInputValues(prevState => {
            return { ...prevState, [name]: value }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        setIsLoading(true)

        if(inputValues.password === inputValues.confirm_password){
            const dataToSend = {user_name: inputValues.user_name, email: inputValues.email, password: inputValues.password}
            userSignUp(dataToSend)
            .then(()=>{
                toast.success("Signed up successfully. Log In to continue.")
                setIsLoading(false)
                navigate("/")
            })
            .catch((e)=>{
                setIsLoading(false)
                if(e.response){
                    if(e.response.status === 400){
                        toast.error("ERROR: Sign up failed. This email is already registered.")
                    }
                }
                else{
                    toast.error("ERROR: Something went wrong.")
                }
            })
        }
        else{
            setIsLoading(false)
            toast.warning("Passwords do not match. Enter again.")
            setInputValues((prevState)=>{
                return {...prevState, password: "", confirm_password: ""}
            })
        }
    }

    return (
        <>
            {/* <CustomSnackbar open={open} message={message} handleClose={() => setOpen(false)} color={color} /> */}
            <form style={{ width: "92%", maxWidth: "450px", backgroundColor: "#e8e8e8", marginTop: "4em" }} className="p-3 mx-auto shadow border rounded" onSubmit={handleSubmit}>
                <h3 className="text-center mb-3">Sign Up</h3>
                <div className="form-group">
                    <label htmlFor="sign-up-username">Username</label>
                    <input id="sign-up-username"
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        name="user_name"
                        value={inputValues.user_name}
                        onChange={handleChange}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="sign-up-email">Email</label>
                    <input id="sign-up-email"
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
                    <label htmlFor="sign-up-password">Password</label>
                    <input id="sign-up-password"
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        name="password"
                        minLength="8"
                        value={inputValues.password}
                        onChange={handleChange}
                        required />
                    <small>*Minimun length 8 characters</small>
                </div>
                <div className="form-group">
                    <label htmlFor="sign-up-confirm-password">Confirm Password</label>
                    <input id="sign-up-confirm-password"
                        type="password"
                        className="form-control"
                        placeholder="Confirm password"
                        name="confirm_password"
                        minLength="8"
                        value={inputValues.confirm_password}
                        onChange={handleChange}
                        required />
                </div>
                {isLoading ? <Loader width="40px" height="40px" mt="2"/> : 
                <button style={{ display: "block" }} type="submit" className="mx-auto mt-2 btn btn-primary">
                    Sign Up
                </button>}
                <div className="mt-3 pt-3 mb-1" style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                    <p className="text-center m-0">Already have an account? <Link to="/" className="font-weight-bold">Log in</Link></p>
                </div>
            </form>
        </>
    )
}