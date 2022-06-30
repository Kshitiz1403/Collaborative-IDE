import React, { useEffect, useState } from 'react'
import useInviteLink from "../../hooks/useInviteLink"
import Snacker from '../Snacker/Snacker'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'

const ShareModal = ({ open, setOpen, link }) => {
    const [inviteLink, setInviteLink] = useState('')
    const [invitationAlert, setInvitationAlert] = useState(false)

    const inviteHook = useInviteLink()

    const copyInviteLink = () => {
        navigator.clipboard.writeText(inviteLink).then(() => setInvitationAlert(true))
    }

    useEffect(() => {
        let domain = new URL(window.location.href).host

        if (open) {
            inviteHook.generateIfNotPresent()
                .then(res => {
                    setInviteLink(`${domain}/join/${res.share}`)
                })
        }
    }, [open])


    return (
        <>
            <Snacker message={"Invitation URL copied"} open={invitationAlert} severity='success' autoHideDuration={3000} onClose={() => setInvitationAlert(false)} />
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'fit-content',
                    bgcolor: 'whitesmoke',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 2,
                    height: 100,
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <div>
                        <div>Invite friends with a join link</div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                            <TextField size='small' disabled value={inviteLink} />
                            <Button size='small' onClick={copyInviteLink}>Copy</Button>
                        </div>
                    </div>

                </Box>
            </Modal>
        </>
    )
}

export default ShareModal