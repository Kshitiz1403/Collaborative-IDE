import os = require('oci-objectstorage');
import common = require('oci-common');
import config from '@/config';
const provider = new common.SimpleAuthenticationDetailsProvider(
  config.objectStorage.tenancy,
  config.objectStorage.user,
  config.objectStorage.fingerprint,
  config.objectStorage.privateKey,
  config.objectStorage.passphrase,
  config.objectStorage.region,
);

const client = new os.ObjectStorageClient({
  authenticationDetailsProvider: provider,
});

let namespace: string;
(async () => {
  try {
    const request = {};
    const response = await client.getNamespace(request);
    console.log('✨🔥✨🔥✨🔥✨🔥request for namespace is generated');
    namespace = response.value;
  } catch (e) {}
})();

export { client, namespace };