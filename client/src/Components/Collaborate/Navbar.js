import Button from '@mui/material/Button'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import colors from '../../constants/colors';
import ShareModal from './ShareModal'

const Navbar = ({ projectname, showInvite = true }) => {
    const [isInviteModalActive, setIsInviteModalActive] = useState(false);
    const navigate = useNavigate()
    return (
        <>
            <ShareModal open={isInviteModalActive} setOpen={setIsInviteModalActive} />
            <div style={{ backgroundColor: colors.light, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20, paddingLeft: 20 }}>
                <Button variant='contained' size='small' onClick={() => navigate('/')}>Home</Button>
                <div style={{ color: 'whitesmoke', fontWeight: 'bold' }}>{projectname}</div>
                <div>
                    {showInvite && <Button variant='contained' size='small' onClick={() => setIsInviteModalActive(true)}>Invite</Button>}
                </div>
            </div>
        </>

    )
}

export default Navbar