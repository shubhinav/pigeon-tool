import React from "react"
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { userLogOut } from "../../ApiCrud/ApiCrud";

export default function Header() {
    return (
        <header className="px-3 py-3 main-header d-flex justify-content-between align-items-center" style={{backgroundColor: "#D8D8D8"}}>
            <div>
            <h1 style={{fontSize: "1.5rem"}} className="mb-0">Logo</h1>
            <p className="m-0" style={{fontSize: "0.85rem"}}>Powered by name</p>
            </div>
            <h1 style={{fontSize: "1.5rem"}}>PigeonTool</h1>
            <div className="btn-group">
                <button type="button" style={{background: "transparent"}} className="px-0 btn d-flex justify-content-between align-items-center dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Icon icon="ant-design:user-outlined" inline={true} /> 
                    <span className="mx-1">John Doe</span>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                    <Link type="button" className="dropdown-item" to="/change-password">Change Password</Link>
                    <Link type="button" className="dropdown-item" to="/change-username">Change Username</Link>
                    <hr/>
                    <button type="button" style={{display: "block"}} className="btn btn-danger mx-auto mb-2" onClick={userLogOut}>Log Out</button>
                </div>
            </div>
        </header>
    )
}

