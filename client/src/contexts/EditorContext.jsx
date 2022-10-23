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

    return (
        <EditorContext.Provider value={{ editorData, setEditorData }}>
            {props.children}
        </EditorContext.Provider>
    )
}

export default EditorProvider