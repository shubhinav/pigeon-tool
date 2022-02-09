import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeUsername } from "../../ApiCrud/ApiCrud";
import Loader from "../../Components/Utils/Loader/Loader";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReactTooltip from 'react-tooltip';

export default function ChangeUsername() {

    const navigate = useNavigate()

    const [inputValues, setInputValues] = useState({ username: "", confirmUsername: "" })
    const [isLoading, setIsLoading] = useState(false)

    function handleChange(e) {
        const { value, name } = e.target
        setInputValues(prevState => {
            return { ...prevState, [name]: value }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (inputValues.username === inputValues.confirmUsername) {
            setIsLoading(true)
            changeUsername(inputValues.username).then(() => {
                toast.success('Username changed successfully')
                setIsLoading(false)
                navigate("/dashboard")
            })
                .catch(() => {
                    setIsLoading(false)
                })
        }
        else {
            toast.warning("Usernames do not match.")
        }
    }

    return (
        <div>
            <div className="container my-3 py-2" style={{ maxWidth: "500px" }}>
                <div className="d-flex align-items-bottom">
                    <Link data-tip="Back to dashboard" to="/dashboard" className="text-dark mr-3 mt-1"><Icon icon="charm:arrow-left" inline={true} height="30px" width="30px" /></Link>
                    <ReactTooltip place="left" effect="solid"/>
                    <h3 className="mb-0"> Change Username</h3>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="newUsername">
                            New Username
                        </label>
                        <input type="text"
                            id="newUsername"
                            className="form-control"
                            placeholder="Enter new username"
                            name="username"
                            value={inputValues.username}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ConfirNewUsername">
                            Confirm New Username
                        </label>
                        <input type="text"
                            id="ConfirNewUsername"
                            className="form-control"
                            placeholder="Re-enter new username"
                            name="confirmUsername"
                            value={inputValues.confirmUsername}
                            onChange={handleChange}
                            required />
                    </div>
                    {isLoading ? <Loader width="40px" height="40px" mt="2" mx="1" /> :
                        <button style={{ display: "block" }} type="submit" className="mt-2 btn btn-primary">
                            Change Username
                        </button>}
                </form>
            </div>
        </div>
    )
}