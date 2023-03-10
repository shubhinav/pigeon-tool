import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { userLogOut } from "../../ApiCrud/ApiCrud";
import { getUserData } from "../../ApiCrud/ApiCrud";
// import "samajh-logo.svg"

export default function Header() {

    const [username, setUsername] = useState()

    useEffect(()=>{
        getUserData().then((res)=>{
            setUsername(res.data.user_name)
        })
    },[])

    return (
        <header className="px-3 py-3 main-header d-flex justify-content-between align-items-center" style={{backgroundColor: "#D8D8D8"}}>
            <div>
            <img src="/samajh-logo.svg" alt="logo"/>
            {/* <p className="m-0" style={{fontSize: "0.85rem"}}>Powered by name</p> */}
            </div>
            <h1 style={{fontSize: "1.5rem"}}>Pigeon Tool</h1>
            <div className="btn-group">
                <button type="button" style={{background: "transparent"}} className="px-0 btn d-flex justify-content-between align-items-center dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Icon icon="ant-design:user-outlined" inline={true} /> 
                    <span className="mx-1">{username}</span>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                    <Link type="button" className="dropdown-item" to="/account/change-password">Change Password</Link>
                    <Link type="button" className="dropdown-item" to="/account/change-username">Change Username</Link>
                    <hr/>
                    <button type="button" style={{display: "block"}} className="btn btn-danger mx-auto mb-2" onClick={userLogOut}>Log Out</button>
                </div>
            </div>
        </header>
    )
}

