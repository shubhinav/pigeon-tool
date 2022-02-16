import React, { useState, useEffect } from "react"
import Header from "../../Components/Header/Header"
import ReactTooltip from 'react-tooltip';
import Loader from "../../Components/Utils/Loader/Loader";
import { getToolUrl } from "../../ApiCrud/ApiCrud";
import { Icon } from '@iconify/react';
import { Link, useParams, useNavigate } from "react-router-dom"
import "./annotationTool.css"

export default function AnnotationTool() {

    const [content, setContent] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        getToolUrl(params.projectName).then((res)=>{
            setContent(res.data)
            setIsLoading(false)
        })
        .catch(()=>{
            setIsLoading(false)
            navigate(`/dashboard/tasks/${params.projectName}`)
        })
    }, [])

    return (
        <div className="tool-page-container">
            <div className="actions-container d-flex justify-content-between p-3" style={{backgroundColor: "rgb(228, 228, 228)"}}>
                <Link data-tip="Back to dashboard" to="/dashboard" className="text-dark mr-3 mt-1"><Icon icon="charm:arrow-left" inline={true} height="30px" width="30px" /></Link>
                <ReactTooltip place="left" effect="solid" />
                <button className="btn btn-primary mr-2">Next Task <Icon icon="charm:arrow-right" inline={true} className="ml-1" /></button>
                <button className="btn btn-primary ml-2">Done</button>
            </div>
            {isLoading ? <Loader /> : <iframe src={content} title="Tool"></iframe>}
        </div>
    )
}