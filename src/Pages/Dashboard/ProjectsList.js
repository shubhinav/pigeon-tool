import React, { useState, useEffect } from "react";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import Loader from "../../Components/Utils/Loader/Loader";
import EmptyListNotif from "../../Components/Utils/EmptyListNotif";
import Fuse from 'fuse.js';
import { getAllProjects } from "../../ApiCrud/ApiCrud";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

export default function ProjectsList() {

    const userType = localStorage.getItem('userType')
    const userEmail = localStorage.getItem('email')

    const [isLoading, setIsLoading] = useState(false)
    const [allProjects, setAllProjects] = useState([])
    const [filteredProjects, setFilteredProjects] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [filter, setFilter] = useState("allProjects")

    const fuse = new Fuse(filteredProjects, {
        keys: [
            'project_name',
        ]
    });

    const results = fuse.search(searchInput);

    useEffect(() => {
        setIsLoading(true)
        getAllProjects()
            .then(res => {
                setAllProjects(res.data)
                setFilteredProjects(res.data)
                setIsLoading(false)
            })
            .catch(() => {
                setIsLoading(false)
            })
        return ()=>{
            setAllProjects([])
            setFilteredProjects([])
            setIsLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (filter === "myProjects") {
            const myProjects = allProjects.filter(project => {
                return project.created_by === userEmail
            })
            setFilteredProjects(myProjects)
        }
        else {
            setFilteredProjects(allProjects)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    const projectsList = () => {
        if (isLoading) {
            return <Loader />
        }

        if (searchInput) {
            if (results && results.length) {
                return results.map((result, index) => {
                    return <ProjectCard key={index} project={result.item} isTask={false} searchInput={searchInput}/>
                })
            }
            else {
                return <EmptyListNotif message="Search does not match any project name." icon="fluent:search-info-24-regular" />
            }
        }
        else {
            if (filteredProjects && filteredProjects.length) {
                return filteredProjects.map((project, index) => {
                    return <ProjectCard key={index} project={project} isTask={false} />
                })
            }
            else {
                return <EmptyListNotif message="No projects created." icon="fluent:projection-screen-dismiss-16-regular" />
            }

        }
    }

    return (
        <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="m-0">Projects</h3>
                {userType !== "student" &&
                    <Link to="/dashboard/create-project" className="btn btn-primary"><Icon icon="akar-icons:plus" color="white" inline={true} /> Create New Project</Link>}
            </div>
            <div className="d-flex justify-content-between mt-3">
                <input className="form-control mr-2"
                       style={{maxWidth: "450px"}}
                       type="text" 
                       placeholder="Search Project Name" 
                       value={searchInput} 
                       onChange={(e) => setSearchInput(e.target.value)} />
                {userType !== "student" &&
                    <select className="ml-2 form-control" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="allProjects">All Projects</option>
                        <option value="myProjects">My Projects</option>
                    </select>}
            </div>
            {projectsList()}
        </div>
    )
}