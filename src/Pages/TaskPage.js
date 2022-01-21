import React, {useState, useEffect} from "react"
import ProjectPageUI from "../Components/ProjectPageUI/ProjectPageUI"
import Loader from "../Components/Utils/Loader/Loader"


export default function ProjectPage(){

    const [task, setTask] = useState()

    useEffect(()=>{
        fetch("/task.json").then(res=>res.json()).then(data=>setTask(data))
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