import React from "react"
import Header from "../Components/Header/Header"
import Navbar from "../Components/Navbar/Navbar"
import ProjectsList from "../Components/ProjectsList/ProjectsList"
import TasksList from "../Components/TasksList/TasksList"
import { Routes, Route } from "react-router-dom"

export default function Dashboard() {
    return (
        <div>
            <Header/>
            <div className="container my-3 py-2" style={{ maxWidth: "900px" }}>
                <Navbar/>
                <Routes>
                    <Route path="projects" element={<ProjectsList/>}/>
                    <Route path="tasks" element={<TasksList/>}/>
                </Routes>
            </div>
        </div>
    )
}