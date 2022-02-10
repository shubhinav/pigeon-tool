import React from "react";
import { Icon } from '@iconify/react';
import Loader from "../Utils/Loader/Loader";
import "./ProjectPageUI.css"

export default function ProjectPageUI({ project, isTask, handleProjectRegister, isLoading }) {

    return (
        <div className="mt-3 mb-2">
            <div className="d-flex justify-content-between align-items-end">
                <div>
                    <h3 className="mb-0">{project.project_name}</h3>
                    <p className="mb-0">Created by <b>{project.created_by}</b></p>
                </div>
                {isTask && <p className="mb-0"><b>{project.annotation_count}</b> images annotated</p>}
            </div>

            {/* <div className="mt-4 border rounded p-3">
                <h5>Sample Images</h5>
                <div className="images-container">
                    {project.sample_images.map((img, i) => {
                        return <img key={i} alt="sample" src={img} />
                    })}
                </div>
            </div> */}

            <div className="mt-4 border rounded p-3">
                <h5>Project Description</h5>
                <p>{project.description}</p>
            </div>

            <div className="mt-4 border rounded p-3">
                <h5>Labels</h5>
                <div className="d-flex flex-wrap">
                    {project.labels.map((label,i) => {
                        return <p key={i} style={{ color: "#333", backgroundColor: "#d8d8d8", borderRadius: "100px" }} className="m-0 mr-2 mt-2 px-2">{label}</p>
                    })}
                </div>
            </div>

            <div className="text-center mt-4">
                {!isTask ? (project.registered ? <button disabled style={{ width: "40%", minWidth: "200px" }} className="m-0 btn btn-primary"><Icon icon="bi:clipboard-check" inline={true} /> Registered</button> :
                    <button style={{ width: "40%", minWidth: "200px" }} className="btn btn-primary" onClick={handleProjectRegister}>
                        {isLoading ? <Loader height="30px" width="30px" mt={0}/> : "Register"}
                    </button>) : <button style={{ width: "40%", minWidth: "200px" }} className="btn btn-primary">
                    Start Annotating
                </button>}
            </div>
        </div>
    )
}