import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import { changePassword } from "../ApiCrud/ApiCrud";
import { UIContext } from "../Context/UIContext";
import Loader from "../Components/Utils/Loader/Loader";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

export default function ChangePassword() {

    const { openSnackbar } = useContext(UIContext)
    const navigate = useNavigate()
    const [inputValues, setInputValues] = useState({ password: "", confirmPassword: "" })
    const [isLoading, setIsLoading] = useState(false)

    function handleChange(e) {
        const { value, name } = e.target
        setInputValues(prevState => {
            return { ...prevState, [name]: value }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (inputValues.password === inputValues.confirmPassword) {
            setIsLoading(true)
            changePassword(inputValues.password).then(res => {
                openSnackbar("Password changed successfully.", "success")
                setIsLoading(false)
                navigate("/dashboard")
            }).catch(e => {
                console.log(e)
                openSnackbar("There was an error.", "error")
                setIsLoading(false)
            })
        }
        else {
            openSnackbar("Passwords do not match. Please enter again.", "warning")
        }
    }

    return (
        <div>
            <Header />
            <div className="container my-3 py-2" style={{ maxWidth: "500px" }}>
                <div className="d-flex align-items-bottom">
                    <Tooltip title="Back to Dashboard" placement="left" arrow>
                        <Link to="/dashboard" className="text-dark mr-3 mt-1"><Icon icon="charm:arrow-left" inline={true} height="30px" width="30px"/></Link>
                    </Tooltip>
                    <h3 className="mb-0"> Change Password</h3>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="newPassword">
                            New Password
                        </label>
                        <input type="password"
                            id="newPassword"
                            className="form-control"
                            placeholder="Enter new password"
                            name="password"
                            value={inputValues.password}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ConfirNewPassword">
                            Confirm New Password
                        </label>
                        <input type="password"
                            id="ConfirNewPassword"
                            className="form-control"
                            placeholder="Re-enter new password"
                            name="confirmPassword"
                            value={inputValues.confirmPassword}
                            onChange={handleChange}
                            required />
                    </div>
                    {isLoading ? <Loader width="40px" height="40px" mt="2" mx="1" /> :
                        <button style={{ display: "block" }} type="submit" className="mt-2 btn btn-primary">
                            Change Password
                        </button>}
                </form>
            </div>
        </div>
    )
}