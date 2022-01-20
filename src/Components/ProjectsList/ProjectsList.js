import React, {useState, useEffect} from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import Loader from "../Utils/Loader/Loader";

export default function ProjectsList(){

    const [projects, setProjects] = useState([])

    useEffect(()=>{
        fetch("/projects.json").then(res=>res.json()).then(data=>setProjects(data))
    },[])

    return(
        <div className="mt-3">
            <h3>Projects</h3>
            {projects.length ? projects.map(project=>{
                return <ProjectCard key={project.id} project={project} isTask={false}/>
            }) : <Loader/>}
        </div>
    )
}