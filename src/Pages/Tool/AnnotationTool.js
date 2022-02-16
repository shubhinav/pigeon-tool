import React, {useState, useEffect} from "react"
import { getToolUrl } from "../../ApiCrud/ApiCrud";
import Header from "../../Components/Header/Header"
import ReactTooltip from 'react-tooltip';
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react";
import "./annotationTool.css"

export default function AnnotationTool() {

    const [content, setContent] = useState()

    useEffect(()=>{
        getToolUrl().then((res)=>{
            setContent(res.data)
        }).catch(()=>{
        })
    },[])

    return (
        <div className="tool-page-container">
            <Header />
            <div className="actions-container">
                <div className="back-btn-container">
                    <Link data-tip="Back to dashboard" to="/dashboard" className="text-dark mr-3 mt-1"><Icon icon="charm:arrow-left" inline={true} height="30px" width="30px" /></Link>
                    <ReactTooltip place="left" effect="solid" />
                </div>

                <div>
                    <button className="btn btn-primary mr-2">Skip</button>
                    <button className="btn btn-primary ml-2">Next</button>
                </div>
            </div>
            <iframe src={content} title="Tool"></iframe>
        </div>
    )
}