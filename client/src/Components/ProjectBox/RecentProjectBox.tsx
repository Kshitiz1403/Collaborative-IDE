import { Box } from '@mui/system'
import React from 'react'
import colors from '../../constants/colors'

const RecentProjectBox = ({ onClick, language, projectName, created }) => {
    return (
        <Box sx={{
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
        }} onClick={onClick}>
            <div style={{ marginRight: 20 }}>
                {language}
            </div>
            <div style={{ marginRight: 20 }}>
                {projectName}
            </div>
            <div>
                {created}
            </div>
        </Box>

    )
}

export default RecentProjectBox