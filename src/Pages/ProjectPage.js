import React, {useState, useEffect} from "react"
import ProjectPageUI from "../Components/ProjectPageUI/ProjectPageUI"
import Loader from "../Components/Utils/Loader/Loader"

export default function ProjectPage(){

    const [project, setProject] = useState()


    useEffect(()=>{
        fetch("/project.json").then(res=>res.json()).then(data=>setProject(data))
    },[])

    return(
        <>
            {project 
            ? 
            <ProjectPageUI key={project.id} project={project} isTask={false}/>
            : 
            <Loader/>}
        </>
    )
}