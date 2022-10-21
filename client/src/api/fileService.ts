import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { joinUtil } from '../utils/projectUtils';
import { getFileAxios } from './baseConfig';
import useProjectService from './projectService';

interface IFileInputDTO {
    relativePath: string;
}

interface ITree {
    name: string;
    type: string;
    files: ITree[];
}
const useFileService = () => {
    const { activeProjectName } = useProjectService();
    const { accessToken } = useAuth();
    const fileAxios = getFileAxios(accessToken, activeProjectName, '/files');
    const pathname = useLocation().pathname;

    let slug = '';

    useEffect(() => {
        if (joinUtil.isJoinPath(pathname)) {
            slug = joinUtil.getSlug(pathname);
            console.log(joinUtil.getSlug(pathname));
        }
    }, [pathname]);

    const getFile = async (inputDTO: IFileInputDTO & { name: string }) => {
        const { relativePath = '', name } = inputDTO;

        try {
            const data: string = await fileAxios.get('', { params: { slug, name, parent: relativePath } });
            return data;
        } catch (err) {
            throw err;
        }
    };

    const saveFile = async (inputDTO: IFileInputDTO & { name: string; data: string }) => {
        const { relativePath = '', data = '', name } = inputDTO;

        try {
            const result: string = await fileAxios.post(
                '/save',
                { name, data },
                { params: { slug, parent: relativePath } },
            );
            return result;
        } catch (err) {
            throw err;
        }
    };

    const createFolder = async (inputDTO: IFileInputDTO & { folder_name: string }) => {
        const { relativePath = '', folder_name } = inputDTO;

        try {
            const result: string = await fileAxios.post(
                '/folder',
                { name: folder_name },
                { params: { slug, parent: relativePath } },
            );
            return result;
        } catch (err) {
            throw err;
        }
    };

    const rename = async (inputDTO: IFileInputDTO & { old_name: string; new_name: string }) => {
        const { relativePath = '', old_name, new_name } = inputDTO;

        try {
            const result = await fileAxios.patch(
                '/rename',
                { old_name, new_name },
                { params: { slug, parent: relativePath } },
            );
            return result;
        } catch (err) {
            throw err;
        }
    };

    const deleteRes = async (inputDTO: IFileInputDTO & { name: string }) => {
        const { relativePath = '', name } = inputDTO;

        try {
            const result = await fileAxios.delete('/delete', {
                params: {
                    parent: relativePath,
                    slug,
                    name,
                },
            });
            return result;
        } catch (err) {
            throw err;
        }
    };

    const getTree = async () => {
        try {
            const tree: ITree = await fileAxios.get('/tree', { params: { slug } });
            console.log(tree);
            return tree;
        } catch (err) {
            throw err;
        }
    };

    return { getTree, getFile, saveFile, createFolder, rename, deleteRes };
};

export default useFileService;
