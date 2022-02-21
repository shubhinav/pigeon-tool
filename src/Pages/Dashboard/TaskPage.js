import React, { useState, useEffect } from "react"
import ProjectPageUI from "../../Components/ProjectPageUI/ProjectPageUI"
import Loader from "../../Components/Utils/Loader/Loader"
import { getTaskDetails, downloadImages } from "../../ApiCrud/ApiCrud"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function ProjectPage() {

    const [task, setTask] = useState()
    // const [imagesData, setImagesData] = useState()
    let params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getTaskDetails(params.projectName)
            .then(res => {
                console.log(res.data)
                setTask(res.data)
            }).catch(() => {
                navigate("/dashboard/tasks")
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleImageDownload() {
        downloadImages(params.projectName).then((res)=>{
            const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(res.data))
            const link = document.createElement('a');
            link.href = data;
            link.download = "annotations.json";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })        
    }

    return (
        <>
            {task
                ?
                <ProjectPageUI key={task.id} project={task} isTask={true} handleImageDownload={handleImageDownload} />
                :
                <Loader />}
        </>
    )
}