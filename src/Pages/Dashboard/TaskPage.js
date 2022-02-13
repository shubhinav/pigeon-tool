import React, {useState, useEffect} from "react"
import ProjectPageUI from "../../Components/ProjectPageUI/ProjectPageUI"
import Loader from "../../Components/Utils/Loader/Loader"
import { getTaskDetails } from "../../ApiCrud/ApiCrud"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function ProjectPage(){

    const [task, setTask] = useState()
    let params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getTaskDetails(params.projectName)
        .then(res=>{
            console.log(res.data)
            setTask(res.data)
        }).catch(()=>{
            navigate("/dashboard/tasks")
        })
    },[])

    return(
        <>
            {task
            ? 
            <ProjectPageUI key={task.id} project={task} isTask={true}/>
            : 
            <Loader/>}
        </>
    )
}