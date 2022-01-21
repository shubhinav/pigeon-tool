import React from "react"
import { Icon } from '@iconify/react';

export default function Header() {
    return (
        <header className="px-3 py-3 main-header d-flex justify-content-between align-items-center" style={{backgroundColor: "#D8D8D8"}}>
            <div>
            <h1 style={{fontSize: "1.5rem"}} className="mb-0">Logo</h1>
            <p className="m-0" style={{fontSize: "0.85rem"}}>Powered by name</p>
            </div>
            <h1 style={{fontSize: "1.5rem"}}>ToolName</h1>
            <div className="btn-group">
                <button type="button" style={{background: "transparent"}} className="px-0 btn d-flex justify-content-between align-items-center dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Icon icon="ant-design:user-outlined" inline={true} /> 
                    <span className="mx-1">John Doe</span>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                    <button className="dropdown-item" type="button">Change Password</button>
                    <button className="dropdown-item" type="button">Log Out</button>
                </div>
            </div>
        </header>
    )
}

