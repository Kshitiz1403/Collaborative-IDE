import React from 'react';
import Box from '@mui/system/Box';
import colors from '../../constants/colors';
import moment from 'moment';

const RecentProjectBox = ({ onClick, language, projectName, updated }) => {
   const getUpdatedTime = (updatedAt: Date) => {
      const now = moment(new Date());
      const updated = moment(updatedAt);
      const relativeTime = updated.from(now);
      return relativeTime;
   };
   return (
      <Box
         sx={{
            width: 'fit-content',
            bgcolor: colors.light,
            color: 'whitesmoke',
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
            minHeight: 10,
            minWidth: 200,
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            userSelect: 'none',
            cursor: 'pointer',
         }}
         onClick={onClick}
      >
         <div style={{ marginRight: 20 }}>{language}</div>
         <div style={{ marginRight: 20 }}>{projectName}</div>
         <div>{getUpdatedTime(updated)}</div>
      </Box>
   );
};

export default RecentProjectBox;
