import React from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"

export default function Navbar() {
    const userType = localStorage.getItem('userType')
    return (
        <ul className="nav border-bottom">
            <li className="nav-item">
                <Link className="nav-link" to="projects">Projects</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="tasks">Tasks</Link>
            </li>
            {userType === "admin" && <li className="nav-item">
                <Link className="nav-link" to="manage">Manage</Link>
            </li>}
        </ul>
    )
}