import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { toast } from "react-toastify";
import { createNewProject } from "../../ApiCrud/ApiCrud";
import Loader from "../../Components/Utils/Loader/Loader";

export default function CreateProjectForm() {

    const [inputValues, setInputValues] = useState({ name: "", label: "", url: "", description: "" })
    const [labelsArray, setLabelsArray] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    function handleChange(e) {
        const { value, name } = e.target
        setInputValues(prevState => {
            return { ...prevState, [name]: value }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if(format.test(inputValues.name)){
            return toast.warning("Project name should not contain any special characters.")
        }
        
        if (labelsArray.length === 0) {
            return toast.warning("Add at least one label to create a project.")
        }
        
        const dataToSend = { project_name: inputValues.name, description: inputValues.description, labels: labelsArray }
        setIsLoading(true)
        createNewProject(dataToSend).then(() => {
            toast.success("Project created successfully.")
            setInputValues({ name: "", label: "", url: "", description: "" })
            setLabelsArray([])
            setIsLoading(false)
        }).catch(() => {
            setIsLoading(false)
        })
    }

    function addLabel() {

        if(!labelsArray.includes(inputValues.label)){
            setLabelsArray(prevState => {
                return [...prevState, inputValues.label]
            })
            setInputValues(prevState => {
                return { ...prevState, label: "" }
            })
        }
        else{
            return toast.warning("Can't add label. Label name must be unique for the task.")
        }
    }

    function deleteLabel(index) {
        let newArray = labelsArray.filter((label, i) => {
            return i !== index
        })
        setLabelsArray(newArray)
    }

    return (
        <form style={{ maxWidth: "550px" }} className="p-3 mx-auto rounded" onSubmit={handleSubmit}>
            <h3 className="text-center mb-3">Create New Project</h3>
            <div className="form-group">
                <label htmlFor="project-name">Project Name</label>
                <input id="project-name"
                    type="text"
                    className="form-control"
                    placeholder="Enter project name"
                    name="name"
                    value={inputValues.name}
                    onChange={handleChange}
                    required />
            </div>
            <div className="form-group">
                <div>
                    <label htmlFor="label">Add Labels</label>
                    <div className="d-flex">
                        <input id="label"
                            type="text"
                            className="form-control"
                            placeholder="Enter label name"
                            name="label"
                            value={inputValues.label}
                            onChange={handleChange} />

                        <button type="button" className="btn btn-primary ml-2" onClick={addLabel} disabled={!inputValues.label}><Icon icon="akar-icons:plus" inline={true} />Add</button>
                    </div>
                </div>
                <div className="mt-2 d-flex flex-wrap">
                    {labelsArray.map((label, index) => {
                        return <span key={index} style={{ color: "#333", backgroundColor: "#d8d8d8", borderRadius: "100px" }} className="border px-2 mr-2">{label} <button type="button" style={{ border: "none" }} className="btn p-0 bg-transparent"><Icon onClick={() => deleteLabel(index)} icon="entypo:cross" /></button></span>
                    })}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description"
                    className="form-control"
                    rows="4"
                    placeholder="Enter project description"
                    name="description"
                    value={inputValues.description}
                    onChange={handleChange}
                    required />
            </div>

            {/* <div className="form-group">
                <label htmlFor="images-url">Google Drive URL</label>
                <input id="images-url"
                    type="url"
                    className="form-control"
                    placeholder="Enter Google Drive URL"
                    name="url"
                    value={inputValues.url}
                    onChange={handleChange}
                    required />
            </div> */}

            {isLoading ? <Loader width="40px" height="40px" mt="2" /> :
                <button style={{ display: "block", width: "50%", minWidth: "200px" }} type="submit" className="mx-auto mt-4 btn btn-primary">
                    Create Project
                </button>}
        </form>
    )
}