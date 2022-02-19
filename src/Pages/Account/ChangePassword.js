import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../ApiCrud/ApiCrud";
import Loader from "../../Components/Utils/Loader/Loader";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReactTooltip from 'react-tooltip';

export default function ChangePassword() {

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
            changePassword(inputValues.password).then(() => {
                toast.success("Password changed successfully.")
                setIsLoading(false)
                navigate("/dashboard")
            }).catch(() => {
                setIsLoading(false)
            })
        }
        else {
            toast.warning("Passwords do not match. Enter again.")
            setInputValues({ password: "", confirmPassword: "" })
        }
    }

    return (
        <div>
            <div className="container my-3 py-2" style={{ maxWidth: "500px" }}>
                <div className="d-flex align-items-bottom">
                    <Link data-tip="Back to dashboard" to="/dashboard" className="text-dark mr-3 mt-1"><Icon icon="charm:arrow-left" inline={true} height="30px" width="30px" /></Link>
                    <ReactTooltip place="left" effect="solid"/>
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
                            minLength="8"
                            value={inputValues.password}
                            onChange={handleChange}
                            required />
                        <small>*Minimun length 8 characters</small>
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
                            minLength="8"
                            value={inputValues.confirmPassword}
                            onChange={handleChange}
                            required />
                    </div>
                    {isLoading ? <Loader width="40px" height="40px" mt="2" mx="1" /> :
                        <button style={{ display: "block" }} 
                                type="submit" className="mt-2 btn btn-primary" 
                                disabled={inputValues.password.length < 8 || inputValues.confirmPassword.length <8}>
                            Change Password
                        </button>}
                </form>
            </div>
        </div>
    )
}