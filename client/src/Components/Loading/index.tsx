import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import colors from '../../constants/colors';
import styles from './styles.module.css';

const Loading = () => (
   <div style={{ backgroundColor: colors.dark }} className={styles.loading}>
      <CircularProgress />
   </div>
);

export default Loading;
