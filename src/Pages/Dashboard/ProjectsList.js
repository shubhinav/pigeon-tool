import React, {useState, useEffect} from "react";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import Loader from "../../Components/Utils/Loader/Loader";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

export default function ProjectsList(){

    const userType = localStorage.getItem('userType')

    const [projects, setProjects] = useState([])

    useEffect(()=>{
        fetch("/projects.json").then(res=>res.json()).then(data=>setProjects(data))
    },[])

    return(
        <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="m-0">Projects</h3>
                {userType !== "student" && <Link to="/dashboard/create-project" className="btn btn-primary"><Icon icon="akar-icons:plus" color="white" inline={true} /> Create New Project</Link>}
            </div>
            {projects.length ? projects.map(project=>{
                return <ProjectCard key={project.id} project={project} isTask={false}/>
            }) : <Loader/>}
        </div>
    )
}