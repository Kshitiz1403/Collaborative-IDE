import React, { useEffect, useRef, useState } from 'react';
import useProjectService from '../../api/projectService';
import Snacker from '../Snacker/Snacker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ShareModal = ({ open, setOpen }) => {
   const [inviteLink, setInviteLink] = useState('');
   const [invitationAlert, setInvitationAlert] = useState(false);

   const { addOrGetSlug } = useProjectService();

   const copyInviteLink = () => {
      setInvitationAlert(true);
   };

   useEffect(() => {
      let domain = new URL(window.location.href).host;

      if (open) {
         (async () => {
            const slug = await addOrGetSlug();
            setInviteLink(`${domain}/join/${slug}`);
         })();
      }
   }, [open]);

   return (
      <>
         <Snacker
            message={'Invitation URL copied'}
            open={invitationAlert}
            severity="success"
            autoHideDuration={3000}
            onClose={() => setInvitationAlert(false)}
         />
         <Modal open={open} onClose={() => setOpen(false)}>
            <Box
               sx={{
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
               }}
            >
               <div>
                  <div>Invite friends with a join link</div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                     <TextField size="small" disabled value={inviteLink} />
                     <CopyToClipboard onCopy={copyInviteLink} text={inviteLink}>
                        <Button size="small">Copy</Button>
                     </CopyToClipboard>
                  </div>
               </div>
            </Box>
         </Modal>
      </>
   );
};

export default ShareModal;
