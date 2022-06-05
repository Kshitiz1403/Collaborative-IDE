import Button from '@mui/material/Button'
import React from 'react'

const LanguageBox = ({ language, onClick }) => {
    return (
        <Button variant="text" sx={{ backgroundColor: '#F0f1f2', margin: 1 }} size='small' onClick={onClick}>{language}</Button>
    )
}

export default LanguageBox