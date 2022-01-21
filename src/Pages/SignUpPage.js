import React, {useState} from "react"
import { Link } from "react-router-dom"

export default function SignUpForm(){

    const [inputValues, setInputValues] = useState({username: "", email: "", password: ""})

    function handleChange(e){
        const {value, name} = e.target
        setInputValues(prevState=>{
            return {...prevState, [name]: value}
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(inputValues)
    }

    return(
        <form style={{width:"92%", maxWidth: "450px", backgroundColor: "#e8e8e8", marginTop: "4em"}} className="p-3 mx-auto shadow border rounded" onSubmit={handleSubmit}>
            <h3 className="text-center mb-3">Sign Up</h3>
            <div className="form-group">
                <label htmlFor="sign-up-username">Username</label>
                <input id="sign-up-username" 
                       type="text" 
                       className="form-control" 
                       placeholder="Enter username"
                       name="username"
                       value={inputValues.username}
                       onChange={handleChange}
                       required/>
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
                       required/>
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
                       required/>
            </div>
            <button style={{display: "block"}} type="submit" className="mx-auto mt-2 btn btn-primary">
                Sign Up
            </button>
            <div className="mt-3 pt-3 mb-1" style={{borderTop: "1px solid rgba(0,0,0,0.1)"}}>
                <p className="text-center m-0">Already have an account? <Link to="/" className="font-weight-bold">Log in</Link></p>
            </div>
        </form>
    )
}