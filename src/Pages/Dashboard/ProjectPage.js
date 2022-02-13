import React, {useState, useEffect} from "react"
import ProjectPageUI from "../../Components/ProjectPageUI/ProjectPageUI"
import Loader from "../../Components/Utils/Loader/Loader"
import { addImagesToProject, getProjectDetails, registerForProject } from "../../ApiCrud/ApiCrud"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

export default function ProjectPage(){

    const [project, setProject] = useState()
    const [count, setCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isImgLoading, setIsImgLoading] = useState(false)
    let params = useParams()

    useEffect(()=>{
        getProjectDetails(params.projectName)
        .then(res=>{
            // console.log(res.data)
            setProject(res.data)
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
            setIsLoading(false)
        })
    }

    function handleProjectAddImages(){
        setIsImgLoading(true)
        addImagesToProject(project.project_name).then(()=>{
            setIsImgLoading(false)
            setCount(prevCount=>prevCount + 1)
            toast.success("Images added successfully")
        })
        .catch(()=>{
            setIsImgLoading(false)
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
                           isImgLoading={isImgLoading}
                           handleProjectRegister={handleProjectRegister}
                           handleProjectAddImages={handleProjectAddImages}/>
            : 
            <Loader/>}
        </>
    )
}