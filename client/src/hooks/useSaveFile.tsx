import React from 'react';
import { useState } from 'react';
import useFileService from '../api/fileService';
import Snacker from '../Components/Snacker/Snacker';
import { ISnacker } from '../interfaces/ISnacker';
import useEditor from './useEditor';

const useSaveFile = () => {
    const { saveFile } = useFileService();
    const { editorData, setEditorData } = useEditor();
    const { filePath, slug, value, activeProjectName, fileName } = editorData;

    const [snackerData, setSnackerData] = useState<ISnacker>({ open: false, severity: 'success', message: '' });

    const [isSaving, setIsSaving] = useState(false);

    const save = async () => {
        try {
            const result = await saveFile({ data: value, name: '', relativePath: filePath });
            return result;
        } catch (err) {
            throw err;
        }
    };

    const closeSnacker = () => {
        setSnackerData(prevData => {
            return { ...prevData, open: false };
        });
    };

    const handleFileSave = async () => {
        setIsSaving(true);
        try {
            const data = await save();
            setEditorData(prevState => {
                return { ...prevState, saved: true };
            });
            setSnackerData(prevData => {
                return { ...prevData, open: true, message: data, severity: 'success' };
            });
        } catch (err) {
            setSnackerData(prevData => {
                return { ...prevData, open: true, severity: 'error', message: err };
            });
        } finally {
            setIsSaving(false);
        }
    };

    const FileSaveAlert = () => (
        <Snacker
            message={snackerData.message}
            open={snackerData.open}
            severity={snackerData.severity}
            onClose={closeSnacker}
            autoHideDuration={3000}
        />
    );

    return { save, handleFileSave, FileSaveAlert, isSaving };
};

export default useSaveFile;
