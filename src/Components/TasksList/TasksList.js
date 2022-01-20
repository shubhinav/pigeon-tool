import React, {useState, useEffect} from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import Loader from "../Utils/Loader/Loader";

export default function TasksList(){

    const [tasks, setTasks] = useState([])

    useEffect(()=>{
        fetch("/projects.json").then(res=>res.json()).then(data=>{
            data.map(ent=>{
                if(ent.registered){
                    setTasks(prevState=>{
                        return [...prevState, ent]
                    })
                }
            })
        })
    },[])

    return(
        <div className="mt-3">
            <h3>Tasks</h3>
            {tasks.length ? tasks.map(task=>{
                return <ProjectCard key={task.id} project={task} isTask={true}/>
            }) : <Loader/>}
        </div>
    )
}