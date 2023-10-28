import { useCallback, useState } from 'react';
import useAuth from '../useAuth';
import useProjectService from './projectService';
import { getProjectAxios } from '../../api/baseConfig';
import useSnack from '../useSnack';
import useEditor from '../useEditor';
import { useDispatch, useSelector } from 'react-redux';
import { setTree, setTreeLoaded } from '../../store/reducers/fileSlice';

interface IFileInputDTO {
   relativePath: string;
}

interface ITree {
   name: string;
   type: string;
   files: ITree[];
}

const useFileService = () => {
   const dispatch = useDispatch();
   const { activeProjectName, slug } = useProjectService();
   const { accessToken } = useAuth();
   const snackService = useSnack();
   const isSaving = useSelector(state => state['file'].isSaving);

   const fileAxios = useCallback(getProjectAxios(accessToken, activeProjectName, '/files'), [
      accessToken,
      activeProjectName,
   ]);

   const getFile = async (inputDTO: IFileInputDTO & { name?: string }) => {
      const { relativePath = '', name = '' } = inputDTO;
      try {
         const data: string = await fileAxios.get('', { params: { slug, name, parent: relativePath } });
         return data;
      } catch (err) {
         snackService.setError({ message: err });
      }
   };

   const getTree = async () => {
      try {
         const tree: ITree = await fileAxios.get('/tree', { params: { slug } });
         dispatch(setTree(JSON.stringify(tree)));
         dispatch(setTreeLoaded());
         return tree;
      } catch (err) {
         snackService.setError({ message: err });
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
         snackService.setError({ message: err });
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
         snackService.setError({ message: err });
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
         snackService.setError({ message: err });
      }
   };

   return { getFile, getTree, isSaving, createFolder, saveFile, deleteRes, rename };
};
export default useFileService;
