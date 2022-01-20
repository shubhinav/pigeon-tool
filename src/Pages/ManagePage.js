import React, {useState} from "react";
import { Icon } from '@iconify/react';

export default function ManagePage() {

    const [adminEmail, setAdminEmail] = useState("")
    const [teacherEmail, setTeacherEmail] = useState("")

    function handleAdminInputChange(e){
        setAdminEmail(e.target.value)
    }

    function handleTeacherInputChange(e){
        setTeacherEmail(e.target.value)
    }

    function handleAdminSubmit(e){
        e.preventDefault()
        console.log(adminEmail)
        setAdminEmail("")
    }

    function handleTeacherSubmit(e){
        e.preventDefault()
        console.log(teacherEmail)
        setTeacherEmail("")
    }

    return (
        <div className="mt-3">
            <h3>Manage</h3>
            <form className="border mt-4 p-3 rounded" style={{ maxWidth: "500px" }} onSubmit={handleTeacherSubmit}>
                <div className="form-group">
                    <label htmlFor="teacher-email">Add a New Teacher</label>
                    <div className="d-flex">
                        <input className="form-control" 
                               id="teacher-email" 
                               type="email" 
                               aria-label="enter teacher email" 
                               placeholder="Enter teacher email" 
                               value={teacherEmail}
                               onChange={handleTeacherInputChange}
                               required/>
                        <button type="submit" className="ml-2 btn btn-primary"><Icon icon="akar-icons:plus" inline={true} />Add</button>
                    </div>
                </div>
            </form>
            
            <form className="border mt-4 p-3 rounded" style={{ maxWidth: "500px" }} onSubmit={handleAdminSubmit}>
                <div className="form-group">
                    <label htmlFor="admin-email">Add a New Admin</label>
                    <div className="d-flex">
                        <input className="form-control" 
                               id="admin-email" 
                               type="email" 
                               aria-label="enter admin email" 
                               placeholder="Enter admin email"
                               value={adminEmail}
                               onChange={handleAdminInputChange}
                               required/>
                        <button type="submit" className="ml-2 btn btn-primary"><Icon icon="akar-icons:plus" inline={true} />Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}