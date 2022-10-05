import useEditor from "./useEditor";
import useFiles from "./useFiles";

const useSaveFile = () => {
    const { saveOrCreateFile } = useFiles()
    const { editorData } = useEditor()
    const { filePath, val } = editorData

    const saveFile = () => {
        return new Promise((resolve, reject)=>{
            console.log(editorData)
            saveOrCreateFile(filePath, val)
            .then(res=>{
                console.log("saved")
                resolve("File saved")
            })
            .catch(err=> reject(err))
        })
    }
    return {saveFile}

}

export default useSaveFile

