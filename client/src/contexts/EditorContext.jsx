import React, { createContext, useState } from "react";

export const EditorContext = createContext()

const EditorProvider = (props) => {
    const initialState = {
        filePath: "",
        slug: "",
        value: "",
        activeProjectName: "",
        fileName: "",
        language: "",
        saved: false
    }
    const [editorData, setEditorData] = useState(initialState)

    const resetEditorData = () =>{
        setEditorData(initialState)
    }

    return (
        <EditorContext.Provider value={{ editorData, setEditorData, resetEditorData }}>
            {props.children}
        </EditorContext.Provider>
    )
}

export default EditorProvider