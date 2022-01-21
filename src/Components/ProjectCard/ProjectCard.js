import React from "react";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import "./ProjectCard.css"

export default function ProjectCard({ project, isTask }) {
    return (
        <div className={`project-card ${project.registered && !isTask && `registered`}`}>
            <div>
                <p className="m-0 project-card-name font-weight-bold">{project.name}</p>
                <p className="m-0 text-muted">Created by {project.created_by}</p>
            </div>
            <div>
                {project.registered &&
                    <div>
                        {!isTask && <div className="d-flex">
                            <p className="m-0 text-muted"><Icon icon="bi:clipboard-check" inline={true} /> Registered</p>
                        </div>}
                        <p className="m-0 text-muted">{project.annotations_count} images annotated</p>
                    </div>}
            </div>
            <div>
                <Link to={isTask ? "/dashboard/task-page" : "/dashboard/project-page"} className="btn btn-outline-primary">View</Link>
            </div>
        </div>
    )
}