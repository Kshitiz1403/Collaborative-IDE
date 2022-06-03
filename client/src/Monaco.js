import React, { useEffect, useState } from 'react'
import * as Y from 'yjs'
import { MonacoBinding } from 'y-monaco'
// import * as monaco from 'monaco-editor'
import Editor from '@monaco-editor/react'
import { WebrtcProvider } from 'y-webrtc'

const Monaco = () => {

    const [EditorRef, setEditorRef] = useState(null)

    const handleEditorMount = (editor) => {
        setEditorRef(editor);
    }

    useEffect(() => {
        if (EditorRef) {
            const yDoc = new Y.Doc()

            let provider = null;
            try {
                provider = new WebrtcProvider("Any room name", yDoc, {
                    signaling: [
                        "wss://signaling.yjs.dev",
                        'wss://y-webrtc-signaling-eu.herokuapp.com',
                        'wss://y-webrtc-signaling-us.herokuapp.com'
                    ]
                })
                const yText = yDoc.getText("monaco")

                const yAwarness = provider.awareness

                const getBinding = new MonacoBinding(yText, EditorRef.getModel(), new Set([EditorRef]), yAwarness)
            }
            catch (err) {
                alert("error in collaborating try refreshing or come back later!")
            }
            return () => {
                if (provider) {
                    provider.disconnect();
                    yDoc.destroy();
                }
            }
        }

    }, [EditorRef])


    return (
        <Editor
            height={"90vh"}
            onMount={handleEditorMount}
            defaultValue="//some comment"
            defaultLanguage='javascript'
        />
    )
}

export default Monaco