import React, { useState, useEffect } from "react"
import ReactTooltip from 'react-tooltip';
import Loader from "../../Components/Utils/Loader/Loader";
import { getToolUrl, saveTask, nextTask } from "../../ApiCrud/ApiCrud";
import { Icon } from '@iconify/react';
import { useParams, useNavigate } from "react-router-dom"
import "./annotationTool.css"
import { toast } from "react-toastify";

export default function AnnotationTool() {

    const [content, setContent] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        getToolUrl(params.projectName).then((res) => {
            setContent(res.data.tool_url)
            setIsLoading(false)
        })
            .catch(() => {
                setIsLoading(false)
                navigate(`/dashboard/tasks/${params.projectName}`)
            })
    }, [])

    function handleSaveTask() {
        saveTask(params.projectName).then(() => {
            toast.success("Task progress saved.")
            navigate("/dashboard/tasks")
        })
    }

    function handleNextTask() {
        setIsLoading(true)
        nextTask(params.projectName).then((res) => {
            setContent(res.data.tool_url)
            setIsLoading(false)
        })
            .catch(() => {
                setIsLoading(false)
                navigate(`/dashboard/tasks/${params.projectName}`)
            })
    }

    return (
        <div className="tool-page-container">
            <div className="actions-container d-flex justify-content-between p-3" style={{ backgroundColor: "rgb(228, 228, 228)" }}>
                <button data-tip="Back to dashboard" 
                        onClick={handleSaveTask} 
                        className="btn text-dark mr-3 mt-1 bg-transparent p-0" 
                        disabled={isLoading}>
                    <Icon icon="charm:arrow-left" inline={true} height="30px" width="30px" />
                </button>
                <ReactTooltip place="left" effect="solid" />
                <button className="btn btn-primary mr-2" onClick={handleNextTask} disabled={isLoading}>Next Job <Icon icon="charm:arrow-right" inline={true} className="ml-1" /></button>
                <button className="btn btn-primary ml-2" onClick={handleSaveTask} disabled={isLoading}>Done</button>
            </div>
            {isLoading ? <Loader /> : <iframe src={content} title="Tool"></iframe>}
        </div>
    )
}