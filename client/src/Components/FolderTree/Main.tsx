import React, {  useEffect, useLayoutEffect, useState } from 'react';
import Tree from './Tree/Tree';
import { VscRefresh } from 'react-icons/vsc';
import IconButton from '@mui/material/IconButton';
import { getExactFilePath, getLanguageFromPath } from './utils';
import useFileService from '../../api/fileService';
import useEditor from '../../hooks/useEditor';
import useSaveFile from '../../hooks/useSaveFile';

const Main = ({ initialTreeState,  }) => {
    const [data, setData] = useState([...initialTreeState]);
    const { getTree, getFile } = useFileService();

    const { editorData, setEditorData } = useEditor();

    // const [dialogState, setDialogState] = useState({ isDialogOpened: false, title: '', description: '', actions: [] });

    const { FileSaveAlert, handleFileSave } = useSaveFile();

    useEffect(() => {
      setData(initialTreeState)
    }, [initialTreeState])
    

    // const handleDirtyFile = () => {
    //     console.log('dirty🐛', editorData);
    //     if (editorData.saved == false)
    //         setDialogState({
    //             isDialogOpened: true,
    //             title: 'File is not saved, do you want to save it or discard it?',
    //             description: `Do you want to save changes to the file ${editorData.fileName}?`,
    //             actions: [
    //                 {
    //                     text: 'Save it',
    //                     onClick: handleFileSave,
    //                     autoFocus: true,
    //                 },
    //                 {
    //                     text: 'Discard it',
    //                     onClick: handleDialogClose,
    //                     autoFocus: false,
    //                 },
    //             ],
    //         });
    // };

    // const handleDialogClose = () => {
    //     setDialogState(prevState => {
    //         return { ...prevState, isDialogOpened: false };
    //     });
    // };

    const handleClick = async node => {
        if (node.node.type == 'folder') return;

        // handleDirtyFile();

        const name = node.node.name;
        const path = getExactFilePath(node.node);
        const language = getLanguageFromPath(path);
        const value = await getFile({ name: '', relativePath: path });
        setEditorData(prevData => {
            return { ...prevData, filePath: path, fileName: name, value: value, language, saved: true };
        });
    };

    const handleChangeOpenFile = () => {
    };

    const handleUpdate = state => {
        // setData(state)
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
    const handleRefresh = async () => {
        const tree = await getTree();
        setData([tree]);
    };

    return (
        <div style={{ userSelect: 'none' }}>
            <div
                style={{
                    margin: 20,
                    fontSize: 20,
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                Files
                <abbr title="Refresh">
                    <IconButton onClick={handleRefresh} color="primary">
                        <VscRefresh color="whitesmoke" />
                    </IconButton>
                </abbr>
            </div>
            {/* <Dialog
                actions={dialogState.actions}
                description={dialogState.description}
                handleClose={handleDialogClose}
                isDialogOpened={dialogState.isDialogOpened}
                title={dialogState.title}
            /> */}
            <FileSaveAlert />
            <Tree data={data} onUpdate={handleUpdate} onNodeClick={handleClick} children="" />
        </div>
    );
};

export default Main;
