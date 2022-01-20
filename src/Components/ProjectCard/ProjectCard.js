import React from "react";
import { Icon } from '@iconify/react';
import "./ProjectCard.css"

export default function ProjectCard({ project, isTask }) {
    return (
        <div className="project-card">
            <div>
                <p className="m-0 project-card-name font-weight-bold">{project.name}</p>
                <p className="m-0 text-muted">Created by {project.created_by}</p>
            </div>
            <div>
                {project.registered && <p className="m-0 text-muted">{project.annotations_count} images annotated</p>}
            </div>
            <div>
                {project.registered
                    ?
                    isTask ? <button className="btn btn-primary">Open</button> : <div className="d-flex">
                        <p style={{ margin: "2px 0.5em 0 0" }}><Icon icon="akar-icons:circle-check-fill" color="green" /></p>
                        <p className="m-0 text-muted">Registered</p>
                    </div>
                    :
                    <button className="btn btn-primary">Register</button>}
            </div>
        </div>
    )
}