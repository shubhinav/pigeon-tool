import React, {useState} from "react"
import { Link } from "react-router-dom"

export default function LogInForm(){

    const [inputValues, setInputValues] = useState({email: "", password: ""})

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
            <h3 className="text-center mb-3">Log In</h3>
            <div className="form-group">
                <label htmlFor="log-in-email">Email</label>
                <input id="log-in-email" 
                       type="email" 
                       className="form-control" 
                       placeholder="Enter email"
                       name="email"
                       value={inputValues.email}
                       onChange={handleChange}
                       required/>
            </div>
            <div className="form-group">
                <label htmlFor="log-in-password">Password</label>
                <input id="log-in-password" 
                       type="password" 
                       className="form-control" 
                       placeholder="Enter password"
                       name="password"
                       value={inputValues.password}
                       onChange={handleChange}
                       required/>
                
                <Link to="/" style={{display: "inline-block", fontSize: "0.9rem"}} className="mt-1">Forgot Password?</Link>
            </div>
            <button style={{display: "block"}} type="submit" className="mx-auto mt-2 btn btn-primary">
                Log In
            </button>
            <div className="mt-3 pt-3 mb-1" style={{borderTop: "1px solid rgba(0,0,0,0.1)"}}>
                <p className="text-center m-0">Don't have an account? <Link to="/sign-up" className="font-weight-bold">Sign up </Link></p>
            </div>
        </form>
    )
}