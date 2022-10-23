import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { MdSync } from 'react-icons/md';
import ClockLoader from 'react-spinners/ClockLoader';
import { useNavigate } from 'react-router-dom';
import colors from '../../constants/colors';
import ShareModal from './ShareModal';
import useSaveFile from '../../hooks/useSaveFile';

const Navbar = ({ projectName: projectName, showInvite = true }) => {
    const [isInviteModalActive, setIsInviteModalActive] = useState(false);
    const navigate = useNavigate();
    const { handleFileSave, FileSaveAlert, isSaving } = useSaveFile();

    return (
        <>
            <ShareModal open={isInviteModalActive} setOpen={setIsInviteModalActive} />
            <div
                style={{
                    backgroundColor: colors.light,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'whitesmoke',
                    paddingRight: 10,
                    paddingLeft: 10,
                }}
            >
                <Button variant="contained" size="small" onClick={() => navigate('/')}>
                    Home
                </Button>
                <div
                    style={{
                        fontWeight: 'bold',
                        userSelect: 'none',
                        width: '100%',
                        position: 'fixed',
                        textAlign: 'center',
                    }}
                >
                    {projectName}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ClockLoader loading={isSaving} color="#8f8f8f" size={20} />
                    <div style={{ marginRight: 20 }}>
                        <abbr title={`Save now (${navigator.platform.match('Mac') ? 'Cmd' : 'Ctrl'}+S)`}>
                            <IconButton color="primary" onClick={handleFileSave}>
                                <MdSync size={20} color="whitesmoke" />
                            </IconButton>
                        </abbr>
                    </div>
                    {showInvite && (
                        <Button variant="contained" size="small" onClick={() => setIsInviteModalActive(true)}>
                            Invite
                        </Button>
                    )}
                    <FileSaveAlert />
                </div>
            </div>
        </>
    );
};

export default Navbar;
