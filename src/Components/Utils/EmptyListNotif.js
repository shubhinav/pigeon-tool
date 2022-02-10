import React from "react"
import { Icon } from "@iconify/react"

export default function EmptyListNotif({message, icon}){
    return(
        <div className="text-center mt-5">
            <Icon icon={icon} height="75px" width="75px" color="rgba(0,0,0,0.3)"/>
            <h4 className="text-center" style={{color: "rgba(0,0,0,0.3)"}}>{message}</h4>
        </div>
    )
}