import Button from '@mui/material/Button'
import React from 'react'
import colors from '../../constants/colors'

const LanguageBox = ({ language, onClick }) => {
    return (
        <Button variant="outlined" sx={{ backgroundColor: colors.light, marginRight: 1, color:'whitesmoke' }} size='small' onClick={onClick}>{language}</Button>
    )
}

export default LanguageBox