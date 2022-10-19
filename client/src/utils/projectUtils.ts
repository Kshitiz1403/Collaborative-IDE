const getUserNameIfCollaborate = (pathname: string) => {
    return pathname.split('@')[1].split('/')[0];
};

const getProjectNameIfCollaborate = pathname => {
    return pathname.split('@')[1].split('/')[1];
};

const getSlugIfJoin = pathname => {
    return pathname.split('/').slice(-1)[0];
};
const isJoinPath = pathname => {
    return pathname.startsWith('/join');
};

const isCollaboratePath = pathname => {
    return pathname.startsWith('/@');
};

export const joinUtil = {
    isJoinPath,
    geSlug: getSlugIfJoin,
};

export const collaborateUtil = {
    isCollaboratePath,
    getProjectName: getProjectNameIfCollaborate,
    getUserName: getUserNameIfCollaborate,
};
