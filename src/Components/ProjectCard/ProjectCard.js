import React from "react";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import getHighlightedText from "../../Utils/highlightSearchText";
import "./ProjectCard.css"

export default function ProjectCard({ project, isTask, searchInput }) {
    return (
        <div className={`project-card ${project.registered && !isTask && `registered`}`}>
            <div>
                <div className="mb-3 d-flex align-items-baseline">
                    <p className="m-0 font-weight-bold project-title">{searchInput ? getHighlightedText(project.project_name, searchInput ) : project.project_name}</p>
                    <div className="ml-3">
                        {project.registered &&
                            <div>
                                {!isTask && <div className="d-flex">
                                    <p className="m-0 text-muted"><Icon icon="bi:clipboard-check" inline={true} /> Registered</p>
                                </div>}
                                {/* <p className="m-0 text-muted">{project.annotations_count} images annotated</p> */}
                            </div>}
                    </div>
                </div>
                <p className="m-0 text-muted">Created by <b>{project.created_by}</b></p>
            </div>
            <div>
                <Link to={isTask ? "/dashboard/task-page" : `/dashboard/projects/${project.project_name}`} className="btn btn-outline-primary ml-3">View <Icon icon="charm:arrow-right" inline={true} /></Link>
            </div>
        </div>
    )
}