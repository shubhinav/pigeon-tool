import React from "react"
import { Icon } from '@iconify/react';

export default function Header() {
    return (
        <header className="px-4 py-3 main-header d-flex justify-content-between align-items-center" style={{backgroundColor: "#D8D8D8"}}>
            <div>
            <h3 className="mb-0">Logo</h3>
            <p className="m-0" style={{fontSize: "0.9rem"}}>Powered by name</p>
            </div>
            <h4>ToolName</h4>
            <div className="btn-group">
                <button type="button" style={{background: "transparent"}} className="btn d-flex justify-content-between align-items-center dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Icon icon="ant-design:user-outlined" /> 
                    <span className="mx-2">John Doe</span>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                    <button className="dropdown-item" type="button">Change Password</button>
                    <button className="dropdown-item" type="button">Log Out</button>
                </div>
            </div>
        </header>
    )
}

