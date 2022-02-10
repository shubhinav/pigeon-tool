import React, {useState, useEffect} from "react";
import { getAllProjects } from "../../ApiCrud/ApiCrud";
import { toast } from "react-toastify";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import Loader from "../../Components/Utils/Loader/Loader";
import EmptyListNotif from "../../Components/Utils/EmptyListNotif";

export default function TasksList(){

    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        getAllProjects()
        .then(res=>{
            setIsLoading(false)
            res.data.map(ent=>{
                if(ent.registered){
                    return setTasks(prevState=>{
                        return [...prevState, ent]
                    })
                }
            })
        })
        .catch(()=>{
            toast.error("There was an error.")
            setIsLoading(false)
        })
    },[])

    const tasksList = () =>{
        if(isLoading){
            return <Loader/>
        }
        else{
            if(tasks && tasks.length){
                return tasks.map((task, index)=>
                    <ProjectCard key={index} project={task} isTask={true}/>)
            }
            else{
                return <EmptyListNotif message="No tasks added. Register for projects to add them to your tasks." icon="carbon:task-add"/>
            }
        }
    }

    return(
        <div className="mt-3">
            <h3>Tasks</h3>
            {tasksList()}
        </div>
    )
}