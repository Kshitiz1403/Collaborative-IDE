import { ShareServiceClient } from '@azure/storage-file-share'

const shareServiceClient = ShareServiceClient.fromConnectionString(process.env.connectionString)

const projectsShareClient = shareServiceClient.getShareClient('projects')

export default projectsShareClient;