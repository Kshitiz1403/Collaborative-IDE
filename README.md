
# Collaborative IDE ( Integrated Development Environment )
## Overview
Collaborative IDE is a full stack system supporting collaborative code editing, compiling & shared shell.

## Design

![Playground](https://objectstorage.ap-mumbai-1.oraclecloud.com/n/bmqamdn4fuln/b/collaborative-ide-bucket/o/github-resources%2FPlayground.png)

### Client-side Editor
####  Monaco editor
Monaco editor is the internal implementation of VSCode's editor. I am using the React port of it [Monaco for React](https://www.npmjs.com/package/@monaco-editor/react#monaco-instance).

Moreover it comes out of the box support for Typescript, Javascript, HTML, CSS autocompletion, go to definition, etc. 
Language support can be added for specific language using the [Microsoft's Language Server Protocol](https://microsoft.github.io/language-server-protocol/) (similar to what's used in VSCode).

#### Yjs
I am using [Yjs](https://yjs.dev/) for providing CRDT & conflict free collaborative editing. It comes with a [Monaco key-binding](https://github.com/yjs/y-monaco).

For synchronization among connected clients, I am using Yjs's pre-setup [websocket servers](https://github.com/yjs/y-websocket/).

### Inviting collaborators
Invite users to collaborate with you by sharing a link which expires in 7 days.
![Invite URL](https://objectstorage.ap-mumbai-1.oraclecloud.com/n/bmqamdn4fuln/b/collaborative-ide-bucket/o/github-resources/Invite.png)


### Server-side Files 
User project files are stored & managed using Azure File Storage. A file share is mounted on a linux machine using the SMB protocol.

### Client-side Directory Tree
I am using [Anuraghazra's React Folder Tree](https://github.com/anuraghazra/react-folder-tree)  (with own adaptation) for displaying the project files to connected users in a tree. P.S. Thanks Anuragahazra for the great package!
<p align='center'>
<img src="https://objectstorage.ap-mumbai-1.oraclecloud.com/n/bmqamdn4fuln/b/collaborative-ide-bucket/o/github-resources%2FDirectory%20Tree.png" alt="Directory Tree Demo" width="200"/>
</p>
 
## Executor
- Users are allowed to submit their code. For security reasons, code cannot be run & built on the server itself. Hence I am using Container technoology like Docker.

- I am using a docker container running ubuntu with pre-installed packages for Java, Python, Cpp & Nodejs.
I am using the Docker engine API with a node driver to accept connections between the nodejs server & the docker container.

- To limit user from creating multiple requests and blowing up the machine, each request is rate limited.
<p align='center'>
<img src='https://objectstorage.ap-mumbai-1.oraclecloud.com/n/bmqamdn4fuln/b/collaborative-ide-bucket/o/github-resources%2FConsole.png' alt='Console'/>
</p>

## Limitations
- Collaborative editing happens through signalling servers. Currently I am using YJS's demo servers but later those can be hosted on the server itself. P.S. I am having troubles doing that. Will figure out a solution soon.
- Inputs cannot be given to the console. That will be taken care when interactive shell is released.

## Future Work
- An interactive shell will be added to the front end for users to install their custom packages without worrying about the setup.
- Language server protocols to be setup for major languages.
