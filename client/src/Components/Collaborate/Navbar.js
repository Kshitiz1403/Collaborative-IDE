import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { MdSync } from 'react-icons/md'
import IconButton from '@mui/material/IconButton';
import colors from '../../constants/colors';
import ShareModal from './ShareModal'
import { useNavigate } from 'react-router-dom';
import ClockLoader from 'react-spinners/ClockLoader'

const Navbar = ({ projectname, showInvite = true, AutoSaveSwitch, toLoadSwitch }) => {
    const [isInviteModalActive, setIsInviteModalActive] = useState(false);
    const navigate = useNavigate()
    return (
        <>
            <ShareModal open={isInviteModalActive} setOpen={setIsInviteModalActive} />
            <div style={{ backgroundColor: colors.light, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'whitesmoke', paddingRight: 10, paddingLeft: 10}}>
                <Button variant='contained' size='small' onClick={() => navigate('/')}>Home</Button>
                <div style={{ fontWeight: 'bold', userSelect: 'none', width: '100%', position: 'fixed', textAlign: 'center' }}>{projectname}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ClockLoader loading={true} color='#8f8f8f' size={20}/>
                    <div style={{ marginRight: 20 }}>
                        <abbr title='Synchronize now'>
                            <IconButton color='primary' >
                                <MdSync size={20} color='whitesmoke' />
                            </IconButton>
                        </abbr>
                    </div>
                    {showInvite && <Button variant='contained' size='small' onClick={() => setIsInviteModalActive(true)}>Invite</Button>}
                </div>
            </div>
        </>

    )
}

export default Navbar