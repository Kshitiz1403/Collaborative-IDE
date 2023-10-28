import { useDispatch } from 'react-redux';
import { setSaved, setSaving } from '../store/reducers/fileSlice';
import useSnack from './useSnack';
import useFileService from './api/fileService';
import useEditor from './useEditor';

const useFile = () => {
   const fileService = useFileService();
   const dispatch = useDispatch();
   const snackService = useSnack();

   const { setFileSaved, fileName, filePath, value } = useEditor();

   const handleFileSave = async () => {
      dispatch(setSaving());
      try {
         const data = await fileService.saveFile({ data: value, name: '', relativePath: filePath });
         setFileSaved();
         snackService.setSuccess({ message: data });
      } catch (err) {
         snackService.setError({ message: err });
      } finally {
         dispatch(setSaved());
      }
   };

   return { handleFileSave };
};

export default useFile;
