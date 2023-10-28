import { useDispatch, useSelector } from 'react-redux';
import useFileService from './api/fileService';
import { useEffect } from 'react';
import { setFileName, setFilePath, setLanguage, setValue } from '../store/reducers/editorSlice';
import useAuth from './useAuth';

const useInitializePlayground = () => {
   const dispatch = useDispatch();
   const isTreeLoaded = useSelector(state => state['file'].treeLoaded);
   const isProjectLoaded = !useSelector(state => state['project'].loading);

   const project = useSelector(state => state['project'].project);

   const fileService = useFileService();

   const { getUser } = useAuth();
   useEffect(() => {
      getUser();
   }, []);

   useEffect(() => {
      (async () => {
         if (isTreeLoaded && isProjectLoaded) {
            const defaultFile = project['defaultFile'];

            const data = await fileService.getFile({ relativePath: '', name: defaultFile });
            dispatch(setValue(data));
            dispatch(setLanguage(project['language']));
            dispatch(setFileName(project['defaultFile']));
            dispatch(setFilePath(project['defaultFile']));
         }
      })();
   }, [isTreeLoaded, isProjectLoaded]);
};
export default useInitializePlayground;
