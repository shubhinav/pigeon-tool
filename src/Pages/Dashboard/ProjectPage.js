import React, {useState, useEffect} from "react"
import ProjectPageUI from "../../Components/ProjectPageUI/ProjectPageUI"
import Loader from "../../Components/Utils/Loader/Loader"
import { addImagesToProject, getProjectDetails, registerForProject } from "../../ApiCrud/ApiCrud"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function ProjectPage(){

    const [project, setProject] = useState()
    const [count, setCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isImgLoading, setIsImgLoading] = useState(false)
    let params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getProjectDetails(params.projectName)
        .then(res=>{
            setProject(res.data)
        })
        .catch(()=>{
            navigate("/")
        })
    },[count])

    function handleProjectRegister(){
        setIsLoading(true)
        registerForProject(project.project_name).then(()=>{
            setIsLoading(false)
            toast.success("Registered successfully")
            navigate(`/dashboard/tasks/${project.projectName}`)
        })
        .catch(()=>{
            setIsLoading(false)
        })
    }

    function handleProjectAddImages(){
        setIsImgLoading(true)
        addImagesToProject(project.project_name).then((res)=>{
            setIsImgLoading(false)
            setCount(prevCount=>prevCount + 1)
            toast.success(`${res.data.images_added} images added successfully.`)
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