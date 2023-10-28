import colors from '../../constants/colors';
import useEditor from '../../hooks/useEditor';
import playgroundStyles from '../../Pages/Playground/playground.module.css';

const Shell = () => {
   const { console } = useEditor();

   return (
      <div style={{ color: 'whitesmoke', height: '100%', display: 'flex', flexDirection: 'column' }}>
         <div className={playgroundStyles.selectedFile} style={{ backgroundColor: colors.light }}>
            Console
         </div>
         <div
            style={{
               flex: 1,
               backgroundColor: colors.light,
               borderTopRightRadius: 5,
               borderBottomRightRadius: 5,
               borderBottomLeftRadius: 5,
               whiteSpace: 'pre-line',
               overflowY: 'auto',
            }}
         >
            {console}
         </div>
      </div>
   );
};

export default Shell;
