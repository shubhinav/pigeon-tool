import React, { useState } from "react";
import { addAnyUser } from "../../ApiCrud/ApiCrud";
import { changeUserPassword } from "../../ApiCrud/ApiCrud";
import Loader from "../../Components/Utils/Loader/Loader";
import { toast } from "react-toastify";

export default function ManagePage() {

    const [addUserValues, setAddUserValues] = useState({
        user_type: "",
        user_name: "",
        email: "",
        password: ""
    })

    const [changePasswordValues, setChangePasswordValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingPwd, setIsLoadingPwd] = useState(false)

    function handleAddUserChange(e) {
        const { value, name } = e.target
        setAddUserValues(prevState => {
            return { ...prevState, [name]: value }
        })
    }

    function handlePasswordValuesChange(e){
        const { value, name } = e.target
        setChangePasswordValues(prevState => {
            return { ...prevState, [name]: value }
        })
    }

    function handleAddUserSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        addAnyUser(addUserValues).then(() => {
            toast.success("User added successfully.")
            setIsLoading(false)
            setAddUserValues({
                user_type: "",
                user_name: "",
                email: "",
                password: ""
            })
        }).catch(() => {
            setIsLoading(false)
        })
    }

    function handleChangePasswordSubmit(e){
        e.preventDefault()

        const dataToSend = {
            email: changePasswordValues.email,
            password: changePasswordValues.password
        }

        if(changePasswordValues.password === changePasswordValues.confirmPassword){
            setIsLoadingPwd(true)
            
            changeUserPassword(dataToSend).then(() => {
                toast.success("Password changed successfully.")
                setIsLoadingPwd(false)
                setChangePasswordValues({
                    email: "",
                    password: "",
                    confirmPassword: "",
                })
            }).catch(() => {
                setIsLoadingPwd(false)
            })
        }
        else{
            toast.warning("Passwords do not match. Please enter again.")
            setChangePasswordValues(prevState=>{
                return {...prevState, password: "", confirmPassword: ""}
            })
        }
        
    }

    return (
        <div className="mt-3">
            <h3>Manage</h3>
            <div className="d-md-flex">
                <form className="border mt-4 p-3 rounded mr-2" style={{ maxWidth: "550px", flex: "1" }} onSubmit={handleAddUserSubmit}>
                    <h5 className="mb-3">Add a User</h5>
                    <div className="form-group">
                        <select className="form-control"
                            name="user_type"
                            value={addUserValues.user_type}
                            onChange={handleAddUserChange}
                            required>
                            <option value="" className="text-muted" disabled>Select user type</option>
                            <option value="admin">Admin</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Enter username"
                            name="user_name"
                            value={addUserValues.user_name}
                            onChange={handleAddUserChange}
                            required />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Enter user email"
                            name="email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            value={addUserValues.email}
                            onChange={handleAddUserChange}
                            required />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            placeholder="Enter user password"
                            name="password"
                            value={addUserValues.password}
                            onChange={handleAddUserChange}
                            required />
                    </div>
                    {isLoading ? <Loader width="40px" height="40px" mt="2" mx="0" /> :
                        <button className="btn btn-primary">Add User</button>}
                </form>

                <form className="border mt-4 p-3 rounded ml-2" style={{ maxWidth: "550px", flex: "1" }} onSubmit={handleChangePasswordSubmit}>
                    <h5 className="mb-3">Change User Password</h5>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Enter user email" 
                            name="email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            value={changePasswordValues.email}
                            onChange={handlePasswordValuesChange}
                            required/>
                    </div>
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            placeholder="Enter new password"
                            name="password"
                            value={changePasswordValues.password}
                            onChange={handlePasswordValuesChange}
                            required/>
                    </div>
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            placeholder="Confirm new password"
                            name="confirmPassword"
                            value={changePasswordValues.confirmPassword}
                            onChange={handlePasswordValuesChange}
                            required/>
                    </div>
                    {isLoadingPwd ? <Loader width="40px" height="40px" mt="2" mx="0" /> :
                        <button className="btn btn-primary">Change Password</button>}
                </form>
            </div>
        </div>
    )
}