import React from "react"
import Header from "../../Components/Header/Header"
import { Outlet } from "react-router-dom"

export default function Account() {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}