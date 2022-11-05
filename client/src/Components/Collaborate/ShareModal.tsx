import React, { useEffect, useState } from 'react';
import useProjectService from '../../api/projectService';
import Snacker from '../Snacker/Snacker';
import colors from '../../constants/colors';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material';
import { BiLink } from 'react-icons/bi';

const ShareModal = ({ open, setOpen }) => {
   const [inviteLink, setInviteLink] = useState('');
   const [invitationAlert, setInvitationAlert] = useState(false);

   const { addOrGetSlug } = useProjectService();

   const copyInviteLink = () => {
      navigator.clipboard.writeText(inviteLink).then(() => setInvitationAlert(true));
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

   const DarkerDisabledTextField = styled(TextField)({
      '& .MuiInputBase-root.Mui-disabled': {
         input: {
            color: 'whitesmoke',
         },
         color: 'whitesmoke',
      },
   });

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
                  bgcolor: colors.light,
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  color: 'whitesmoke',
               }}
            >
               <div>Invite friends with a join link</div>
               <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                  <div
                     style={{
                        padding: 5,
                        width: 250,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: 'rgba(245, 245, 245, 0.3)',
                        borderRadius: 5,
                        marginRight: 5,
                     }}
                  >
                     {inviteLink}
                  </div>
                  <abbr title="Copy">
                     <IconButton
                        size="small"
                        onClick={copyInviteLink}
                        sx={{
                           color: 'whitesmoke',
                        }}
                     >
                        <BiLink />
                     </IconButton>
                  </abbr>
               </div>
            </Box>
         </Modal>
      </>
   );
};

export default ShareModal;
