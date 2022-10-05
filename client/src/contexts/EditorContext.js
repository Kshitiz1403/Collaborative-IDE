import React, { createContext, useState } from "react";

export const EditorContext = createContext()

const EditorProvider = (props) => {
    // to do -> handle default filepath based on active project 
    const [editorData, setEditorData] = useState({ filePath: "main.js", inviteID: "", value: "" })

    return (
        <EditorContext.Provider value={{ editorData, setEditorData }}>
            {props.children}
        </EditorContext.Provider>
    )
}

export default EditorProvider