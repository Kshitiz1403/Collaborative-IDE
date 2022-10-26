import { Docker } from 'node-docker-api';

const docker = new Docker({socketPath:'/var/run/docker.sock'})

export default docker