import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import useFileService from '../../api/fileService';
import useProjectService from '../../api/projectService';
import Navbar from '../../Components/Collaborate/Navbar';
import Main from '../../Components/FolderTree/Main';
import Monaco from '../../Components/Monaco/Monaco';
import colors from '../../constants/colors';
import useEditor from '../../hooks/useEditor';
import useSaveFile from '../../hooks/useSaveFile';
import { joinUtil } from '../../utils/projectUtils';
import styles from './playground.module.css';

const Playground = ({ slug }) => {
    const [treeLoading, setTreeLoading] = useState(true);
    const [treeState, setTreeState] = useState([]);

    const { getTree } = useFileService();
    const { activeProjectName } = useProjectService();
    const { editorData, resetEditorData } = useEditor();
    const { handleFileSave, FileSaveAlert } = useSaveFile();
    const location = useLocation();

    const pathname = location.pathname;

    useEffect(() => {
        resetEditorData();
    }, []);

    useEffect(() => {
        if (activeProjectName && pathname) {
            if (joinUtil.getSlug(pathname)) handleGetTree();
        }
    }, [pathname, activeProjectName]);

    useEffect(() => {
        const ctrlS = e => {
            if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                handleFileSave();
            }
        };
        document.addEventListener('keydown', ctrlS);
        return () => document.removeEventListener('keydown', ctrlS);
    }, [editorData]);

    const handleGetTree = async () => {
        const tree = await getTree();
        setTreeState([tree]);
        setTreeLoading(false);
    };

    return (
        <>
            <div style={{ backgroundColor: colors.dark }} className={styles.wrapper}>
                <div className={styles.navbarWrapper}>
                    <Navbar projectName={activeProjectName} />
                </div>
                {treeLoading && <CircularProgress />}
                {!treeLoading && (
                    <div style={{ display: 'flex' }}>
                        <div style={{ backgroundColor: colors.light }} className={styles.treeWrapper}>
                            <Main initialTreeState={treeState} />
                        </div>
                        <FileSaveAlert />
                        {editorData.filePath && (
                            <div style={{ flex: 1 }}>
                                <div style={{ backgroundColor: colors.light }} className={styles.selectedFile}>
                                    <abbr title={editorData.filePath} style={{ textDecoration: 'none' }}>
                                        {editorData.fileName}
                                    </abbr>
                                </div>
                                <Monaco roomId={slug} key={editorData.filePath} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Playground;
