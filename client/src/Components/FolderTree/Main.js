import React, { useLayoutEffect, useState } from 'react'
import Tree from './Tree/Tree'
import { VscRefresh } from "react-icons/vsc";
import useTree from '../../hooks/useTree';
import IconButton from '@mui/material/IconButton';
import { getExactFilePath } from './utils';
import useSaveFile from '../../hooks/useSaveFile';

const Main = ({ initialTreeState }) => {

    let [data, setData] = useState([...initialTreeState])
    // const { editorData } = useEditor()
    const { getTree } = useTree()
    const { saveFile } = useSaveFile()

    const handleClick = (node) => {
        // let path;
        // if (node.node.type == 'file') {
        //     path = getExactFilePath(node.node)
        // }
        // console.log(node)
        // change open file
        saveFile()
        // if (editorData.filePath!=path)
        // handleChangeOpenFile()
        // setEditorValue({filePath:path, })
    };

    const handleChangeOpenFile = () => {
        // handle force save
        // newFileRelativePath
        saveFile()
        // .then(res=>{
        //     console.log(res)
        //     // setEditorData({...editorData, filePath:newFileRelativePath, value:""})
        // })
    }

    const handleUpdate = (state) => {
        // localStorage.setItem(
        //     "tree",
        //     JSON.stringify(state, function (key, value) {
        //         if (key === "parentNode" || key === "id") {
        //             return null;
        //         }
        //         return value;
        //     })
        // );
    };

    useLayoutEffect(() => {
        try {
            let savedStructure = JSON.parse(localStorage.getItem("tree"));
            if (savedStructure) {
                setData(savedStructure);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleRefresh = () => {
        getTree()
            .then(result => setData(result))
            .catch(err => console.error(err))
    }

    return (<div>
        <div style={{ margin: 20, fontSize: 20, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Files
            <abbr title='Refresh'>
                <IconButton onClick={handleRefresh} color='primary'>
                    <VscRefresh color='whitesmoke' />
                </IconButton>
            </abbr>

        </div>
        <Tree data={data} onUpdate={handleUpdate} onNodeClick={handleClick} />
    </div>
    )
}

export default Main