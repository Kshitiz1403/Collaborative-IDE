import { ShareServiceClient} from '@azure/storage-file-share'

const connStr = "DefaultEndpointsProtocol=https;AccountName=collaborativeidefiles;AccountKey=IE3phfYwYLHx5xdfMWjjKlsG+tTgEkkLpkAe9KcBsWw5/vJqRPTNPwh4+7O+bXk5Qva5qrsSPjgw+ASt8J4csw==;EndpointSuffix=core.windows.net"

const shareServiceClient = ShareServiceClient.fromConnectionString(connStr)

const projectsShareClient = shareServiceClient.getShareClient('projects')

export default projectsShareClient;