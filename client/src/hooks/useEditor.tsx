import { useContext } from "react";
import { EditorContext } from "../contexts/EditorContext";

const useEditor = () => {

    const { editorData, setEditorData } = useContext(EditorContext)


    return { editorData, setEditorData }

}

export default useEditor;
