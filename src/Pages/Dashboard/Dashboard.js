import React from "react"
import Header from "../../Components/Header/Header"
import Navbar from "../../Components/Navbar/Navbar"
import { Outlet } from "react-router-dom"

export default function Dashboard() {
    return (
        <div>
            <Header/>
            <div className="container my-3 py-2" style={{ maxWidth: "900px" }}>
                <Navbar/>
                <Outlet/>
            </div>
        </div>
    )
}