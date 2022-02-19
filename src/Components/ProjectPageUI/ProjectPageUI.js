import React from "react";
import { Icon } from '@iconify/react';
import Loader from "../Utils/Loader/Loader";
import "./ProjectPageUI.css"
import { baseUrl } from "../../ApiCrud/ApiCrud"
import { Link } from "react-router-dom";

export default function ProjectPageUI(props) {

    const { project, isTask, handleProjectRegister, handleProjectAddImages, isImgLoading, isLoading, handleImageDownload } = props

    const userType = localStorage.getItem('userType')

    return (
        <div className="mt-3 mb-2">
            <div className="d-flex justify-content-between align-items-end">
                <div>
                    <h3 className="mb-2">{project.project_name}</h3>
                    <p className="mb-0">Created by <b>{project.created_by}</b></p>
                </div>
                {isTask &&
                    <div className="text-center">
                        <h5 className="mb-0">{project.annotated_images}</h5>
                        <p className="mb-0">Images Annotated</p>
                    </div>}
            </div>

            <div className="mt-4 border rounded p-3">
                <h5>Project Description</h5>
                <p className="mb-0">{project.description}</p>
            </div>

            {isTask &&
                <div className="mt-4 border rounded p-3">
                    <h5>Annotations</h5>
                    <div className="d-flex justify-content-between align-items-end">
                        <div>
                            <p className="mb-1"><b>{project.annotated_images}</b> images annotated</p>
                            <p className="mb-0"><b>{project.rewarded_images}</b> rewarded images</p>
                        </div>
                        <button className="btn btn-primary" 
                                disabled={!project.annotated_images}
                                onClick={handleImageDownload}>
                            Download Annotated Images
                        </button>
                    </div>
                </div>}

            {!isTask && userType !== 'student' &&
                <div className="mt-4 border rounded p-3">
                    <h5>Path</h5>
                    <div className="d-md-flex justify-content-between align-items-baseline">
                        <p className="m-0">{project.path}</p>
                        <button className="btn btn-primary" onClick={handleProjectAddImages}>
                            {isImgLoading ? <Loader height="30px" width="30px" mt={0} /> : "Add Images"}
                        </button>
                    </div>
                </div>}

            {project.images && project.images.length ?
                <div className="mt-4 border rounded p-3">
                    <h5>Sample Images</h5>
                    <div className="images-container">
                        {project.images.map((img, i) => {
                            return <img key={i} alt="sample" src={`${baseUrl}api/project/get-image${img}`} />
                        })}
                    </div>
                </div> : <></>}

            <div className="mt-4 border rounded p-3">
                <h5>Labels</h5>
                <div className="d-flex flex-wrap">
                    {project.labels.map((label, i) => {
                        return <p key={i} style={{ color: "#333", backgroundColor: "#d8d8d8", borderRadius: "100px" }} className="m-0 mr-2 mt-2 px-2">{label}</p>
                    })}
                </div>
            </div>

            <div className="text-center mt-4">
                {!isTask ? (project.registered ? <button disabled style={{ width: "40%", minWidth: "200px" }} className="m-0 btn btn-primary"><Icon icon="bi:clipboard-check" inline={true} /> Registered</button> :
                    <button style={{ width: "40%", minWidth: "200px" }} className="btn btn-primary" onClick={handleProjectRegister}>
                        {isLoading ? <Loader height="30px" width="30px" mt={0} /> : "Register"}
                    </button>) : <Link to={`/tool/${project.project_name}`} style={{ width: "40%", minWidth: "200px" }} className="btn btn-primary">
                    Start Annotating
                </Link>}
            </div>
        </div>
    )
}