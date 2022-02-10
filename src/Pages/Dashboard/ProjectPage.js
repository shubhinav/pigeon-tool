import React, {useState, useEffect} from "react"
import ProjectPageUI from "../../Components/ProjectPageUI/ProjectPageUI"
import Loader from "../../Components/Utils/Loader/Loader"
import { getProjectDetails } from "../../ApiCrud/ApiCrud"
import { useParams } from "react-router-dom"
import { registerForProject } from "../../ApiCrud/ApiCrud"
import { toast } from "react-toastify"

export default function ProjectPage(){

    const [project, setProject] = useState()
    const [count, setCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    let params = useParams()

    useEffect(()=>{
        getProjectDetails(params.projectName)
        .then(res=>{
            console.log(res.data)
            setProject(res.data)
        }).catch(()=>{
            toast.error("There was an error.")
        })
    },[count])

    function handleProjectRegister(){
        setIsLoading(true)
        registerForProject(project.project_name).then(()=>{
            setIsLoading(false)
            setCount(prevCount=>prevCount + 1)
            toast.success("Registered successfully")
        })
        .catch(()=>{
            toast.error("There was an error.")
            setIsLoading(false)
        })
    }

    return(
        <>
            {project 
            ? 
            <ProjectPageUI key={project.id} 
                           project={project} 
                           isTask={false} 
                           isLoading={isLoading}
                           handleProjectRegister={handleProjectRegister}/>
            : 
            <Loader/>}
        </>
    )
}