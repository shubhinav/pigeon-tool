import React from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <ul className="nav border-bottom">
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard/projects">Projects</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard/tasks">Tasks</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard/manage">Manage</Link>
            </li>
        </ul>
    )
}