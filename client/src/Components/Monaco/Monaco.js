import React, { useContext, useEffect, useState } from 'react'
import * as Y from 'yjs'
import { MonacoBinding } from 'y-monaco'
import Editor from '@monaco-editor/react'
import { WebrtcProvider } from 'y-webrtc'
import { CircularProgress } from '@mui/material'
import colors from '../../constants/colors'
import languageMap from '../../utils/languageMappings'
import useEditor from '../../hooks/useEditor'

const Monaco = ({ roomId, height, loadingComponent = <CircularProgress /> }) => {

    const { editorData, setEditorData } = useEditor()

    const [EditorRef, setEditorRef] = useState(null)

    const handleWillMount = (monaco) => {
        monaco.editor.defineTheme('customTheme', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': colors.light,
            },
        })
    }

    const handleEditorMount = (editor) => {
        setEditorRef(editor);
    }

    const handleUpdateValue = (value) => {
        setEditorData(prevState => {
            return {
                ...prevState,
                value: value,
                saved: false
            }
        })
    }

    const getMonacoSubscriberId = () => {
        return `${roomId}-${editorData.filePath}`
    }

    useEffect(() => {
        if (EditorRef) {
            const yDoc = new Y.Doc()

            let provider = null;
            try {
                provider = new WebrtcProvider(getMonacoSubscriberId(), yDoc, {
                    signaling: [
                        "wss://signaling.yjs.dev",
                        'wss://y-webrtc-signaling-eu.herokuapp.com',
                        'wss://y-webrtc-signaling-us.herokuapp.com'
                    ],
                })
                const yText = yDoc.getText("monaco")

                const yAwarness = provider.awareness

                const getBinding = new MonacoBinding(yText, EditorRef.getModel(), new Set([EditorRef]), yAwarness)
                EditorRef.getModel().setValue(editorData.value)
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
            height={height}
            onMount={handleEditorMount}
            defaultLanguage={languageMap[editorData.language]}
            theme='customTheme'
            loading={loadingComponent}
            beforeMount={handleWillMount}
            onChange={handleUpdateValue}
            options={{
                fontSize: 16
            }}
        />
    )
}

export default Monaco