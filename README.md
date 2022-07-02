# Collaborative IDE
## Overview
Collaborative IDE is a full stack system supporting collaborative code editing, compiling & shared shell.

## Design


### Client-side Editor
####  Monaco editor
Monaco editor is the internal implementation of VSCode's editor. I am using the React port of it [Monaco for React](https://www.npmjs.com/package/@monaco-editor/react#monaco-instance).

Moreover it comes out of the box support for Typescript, Javascript, HTML, CSS autocompletion, go to definition, etc. 
Language support can be added for specific language using the [Microsoft's Language Server Protocol](https://microsoft.github.io/language-server-protocol/) (similar to what's used in VSCode).

#### Yjs
I am using [Yjs](https://yjs.dev/) for providing CRDT & conflict free collaborative editing. It comes with a [Monaco key-binding](https://github.com/yjs/y-monaco).

For synchronization among connected clients, I am using Yjs's pre-setup [websocket servers](https://github.com/yjs/y-websocket/).

### <a name="server-files"></a> Server-side Files 
User project files are stored & managed using [Azure Files](https://docs.microsoft.com/en-us/azure/storage/files/storage-files-introduction). A file share is mounted on a linux machine using the SMB protocol.

REST Api for file handling is managed by a microservice running on Nodejs.

### Client-side Directory Tree
I am using [Anuraghazra's React Folder Tree](https://github.com/anuraghazra/react-folder-tree)  (with own adaptation) for displaying the project files to connected users in a tree.
 
 Project files are fetched from the mircoservice running on [Server-side Files](#server-files).
 