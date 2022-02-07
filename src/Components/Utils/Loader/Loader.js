import React from "react";
import "./Loader.css"

export default function Loader({width="50px", height="50px", mt="4", mx="auto"}){
    return(
        <div className={`loader mt-${mt} mx-${mx}`} style={{width: width, height: height}}></div>
    )
}

// PROP VALUES:
// width - num[px]
// height - num[px]
// mt - num
// mx - num