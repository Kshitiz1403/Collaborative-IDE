import { useDispatch, useSelector } from 'react-redux';
import {
   reset,
   setConsole as setConsoleSlice,
   setFileName,
   setFilePath,
   setLanguage,
   setSaved,
   setUnsaved,
   setValue,
} from '../store/reducers/editorSlice';

const useEditor = () => {
   const dispatch = useDispatch();

   const filePath = useSelector(state => state['editor'].filePath);
   const fileName = useSelector(state => state['editor'].fileName);
   const language = useSelector(state => state['editor'].language);
   const value = useSelector(state => state['editor'].value);
   const saved = useSelector(state => state['editor'].saved);
   const console = useSelector(state => state['editor'].console);

   const updateValue = (value: string) => {
      dispatch(setValue(value));
      dispatch(setUnsaved());
   };

   const handleFileSelect = (value: string, filePath: string, fileName: string, language: string) => {
      dispatch(setValue(value));
      dispatch(setFilePath(filePath));
      dispatch(setFileName(fileName));
      dispatch(setLanguage(language));
      dispatch(setSaved());
   };

   const resetEditor = () => dispatch(reset());

   const setFileSaved = () => dispatch(setSaved());

   const setConsole = (consoleValue: string) => dispatch(setConsoleSlice(consoleValue));

   return {
      resetEditor,
      filePath,
      fileName,
      language,
      setFileSaved,
      updateValue,
      value,
      handleFileSelect,
      saved,
      setConsole,
      console,
   };
};

export default useEditor;
