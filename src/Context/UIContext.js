import React, {useState} from "react";

const UIContext = React.createContext()

function UIContextProvider({children}){

    const [open, setOpen] = useState(false)
    const [color, setColor] = useState("")
    const [message, setMessage] = useState("")

    function openSnackbar(message, color){
        setOpen(true)
        setColor(color)
        setMessage(message)
    }

    return(
        <UIContext.Provider value={{
                                    open,
                                    color,
                                    message,
                                    openSnackbar,
                                    setOpen
                                   }}>
            {children}
        </UIContext.Provider>
    )
}

export {UIContext, UIContextProvider}