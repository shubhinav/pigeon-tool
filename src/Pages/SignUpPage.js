import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UIContext } from "../Context/UIContext"
import { userSignUp } from "../ApiCrud/ApiCrud"
import Loader from "../Components/Utils/Loader/Loader"

export default function SignUpForm() {

    let navigate = useNavigate()

    const {openSnackbar} = useContext(UIContext)

    const [inputValues, setInputValues] = useState({ user_name: "", email: "", password: "" })
    const [isLoading, setIsLoading] = useState(false)

    function handleChange(e) {
        const { value, name } = e.target
        setInputValues(prevState => {
            return { ...prevState, [name]: value }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        setIsLoading(true)

        userSignUp(inputValues)
        .then(()=>{
            openSnackbar("Signed up successfully. Log In to continue.", "success")
            setIsLoading(false)
            navigate("/")
        })
        .catch(e=>{
            console.log(e)
            setIsLoading(false)
            openSnackbar("There was an error.", "error")
        })
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
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name="email"
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
                        value={inputValues.password}
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