import Button from '@mui/material/Button'
import React, { useState } from 'react'
import ShareModal from './ShareModal'

const Navbar = ({ projectname }) => {
    const [isInviteModalActive, setIsInviteModalActive] = useState(false);
    return (
        <>
            <ShareModal open={isInviteModalActive} setOpen={setIsInviteModalActive} />
            <div style={{ backgroundColor: 'cyan', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20, paddingLeft: 20 }}>
                <Button variant='contained' size='small'>Home</Button>
                <div>{projectname}</div>
                <Button variant='contained' size='small' onClick={() => setIsInviteModalActive(true)}>Invite</Button>
            </div>
        </>

    )
}

export default Navbar