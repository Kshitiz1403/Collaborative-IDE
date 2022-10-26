import { useContext } from "react";
import { EditorContext } from "../contexts/EditorContext";

const useEditor = () => {

    const { editorData, setEditorData, resetEditorData } = useContext(EditorContext)


    return { editorData, setEditorData, resetEditorData }

}

export default useEditor;
