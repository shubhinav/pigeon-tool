import React from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <ul className="nav border-bottom">
            <li className="nav-item">
                <Link className="nav-link" to="projects">Projects</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="tasks">Tasks</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="manage">Manage</Link>
            </li>
        </ul>
    )
}