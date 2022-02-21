import React, { useState, useEffect } from "react"
import ReactTooltip from 'react-tooltip';
import Loader from "../../Components/Utils/Loader/Loader";
import { getToolUrl, saveTask, nextTask } from "../../ApiCrud/ApiCrud";
import { Icon } from '@iconify/react';
import { useParams, useNavigate } from "react-router-dom"
import "./annotationTool.css"
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function AnnotationTool() {

    const [content, setContent] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [doneShow, setDoneShow] = useState(false)
    const [nextShow, setNextShow] = useState(false)
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
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleSaveTask() {
        saveTask(params.projectName).then(() => {
            toast.success("Task progress saved.")
            navigate("/dashboard/tasks")
        })
    }

    function handleNextTask() {
        setIsLoading(true)
        setNextShow(false)
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
        <>
            <Modal show={doneShow} onHide={()=>setDoneShow(false)}>
                <Modal.Header>
                <Modal.Title>Save Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to leave this job? Any unsaved changes will be lost.</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>setDoneShow(false)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSaveTask}>
                    Proceed
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={nextShow} onHide={()=>setNextShow(false)}>
                <Modal.Header>
                <Modal.Title>Save Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to go to the next task? Any unsaved changes will be lost.</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>setNextShow(false)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleNextTask}>
                    Proceed
                </Button>
                </Modal.Footer>
            </Modal>

            <div className="tool-page-container">
                <div className="actions-container d-flex justify-content-between p-3" style={{ backgroundColor: "rgb(228, 228, 228)" }}>
                    <button data-tip="Back to dashboard" 
                            onClick={()=>setDoneShow(true)} 
                            className="btn text-dark mr-3 mt-1 bg-transparent p-0" 
                            disabled={isLoading}>
                        <Icon icon="charm:arrow-left" inline={true} height="30px" width="30px" />
                    </button>
                    <ReactTooltip place="left" effect="solid" />
                    <button className="btn btn-primary mr-2" onClick={()=>setNextShow(true)} disabled={isLoading}>Next Job <Icon icon="charm:arrow-right" inline={true} className="ml-1" /></button>
                    <button className="btn btn-primary ml-2" onClick={()=>setDoneShow(true)} disabled={isLoading}>Done</button>
                </div>
                {isLoading ? <Loader /> : <iframe src={content} title="Tool"></iframe>}
            </div>
        </>
    )
}