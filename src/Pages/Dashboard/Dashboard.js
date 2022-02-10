import React from "react"
import Header from "../../Components/Header/Header"
import Navbar from "../../Components/Navbar/Navbar"
import ScrollToTop from "react-scroll-to-top";
import { Outlet } from "react-router-dom"
import { Icon } from '@iconify/react';

export default function Dashboard() {
    return (
        <div>
            <Header />
            <div className="container my-3 py-2" style={{ maxWidth: "900px" }}>
                <Navbar />
                <Outlet />
            </div>

            <ScrollToTop smooth 
                         component={<Icon icon="charm:arrow-up" color="#fff" height="28" width="28" inline={true}/>} 
                         top={250} 
                         style={{ borderRadius: "100px", backgroundColor: "#007BFF"}} 
            />

        </div>
    )
}

{/* <Icon icon="charm:arrow-up" /> */ }