import React, { useEffect, useLayoutEffect, useState } from 'react'
import Tree from './Tree/Tree'
import { VscRefresh } from "react-icons/vsc";
import IconButton from '@mui/material/IconButton';
import { getExactFilePath } from './utils';
import useFileService from '../../api/fileService';

const Main = ({ initialTreeState }) => {

    let [data, setData] = useState([...initialTreeState])
    // const { editorData } = useEditor()
    const { getTree } = useFileService()

    const handleClick = (node) => {
        // let path;
        // if (node.node.type == 'file') {
        //     path = getExactFilePath(node.node)
        // }
        // console.log(node)
        // change open file
        // saveFile()
        // if (editorData.filePath!=path)
        // handleChangeOpenFile()
        // setEditorValue({filePath:path, })
    };

    const handleChangeOpenFile = () => {
        // handle force save
        // newFileRelativePath
        // saveFile()
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

    const handleRefresh = async () => {
        const tree = await getTree();
        console.log(tree)
        setData([tree])
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