import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Collaborate/Navbar'
import Monaco from '../Components/Monaco/Monaco'
import Main from '../Components/FolderTree/Main'
import CircularProgress from '@mui/material/CircularProgress'
import colors from '../constants/colors'
import useProjectService from '../api/projectService'
import useAuth from '../hooks/useAuth'
import useFileService from '../api/fileService'

const Collaborate = () => {

  const { adminUsername, activeProjectName, handleUserCollaborateTasks, addOrGetSlug } = useProjectService()
  const { username } = useAuth()

  const [loading, setLoading] = useState(true)
  const [inviteLink, setInviteLink] = useState("")
  const [treeLoading, setTreeLoading] = useState(true)
  const [treeState, setTreeState] = useState([])
  const { getTree } = useFileService()

  useEffect(() =>{
    (async()=>{
      await handleUserCollaborateTasks()
    })()
  },[username])

  useEffect(() => {
    if (adminUsername && activeProjectName) {
      handleGetTree()
    }
  }, [adminUsername, activeProjectName])

  const handleGetTree = async() => {
    const tree = await getTree()
    setTreeState([tree]);
    setTreeLoading(false)
  }

  const getInviteLink = async () => {
    if (activeProjectName) {
      const slug = await addOrGetSlug()
      setInviteLink(slug)
    }
  }
  
  useEffect(() => {
    const onPageLoad = () => {
      setLoading(false)
    }
    if (document.readyState == 'complete') {
      onPageLoad()
    } else {
      window.addEventListener("load", onPageLoad)
      return () => window.removeEventListener("load", onPageLoad)
    }
  }, [])


  useEffect(() => {
    if (!loading) {
      getInviteLink()
    }
  }, [loading, activeProjectName])

  useEffect(() => {
    if (!loading) {
      document.title = activeProjectName
    }
  }, [loading, activeProjectName])


  return (
    <div style={{ backgroundColor: colors.dark, height: '100vh', overflow: 'hidden' }}>
      {/* TODO-> handle username in URL to be same as that in auth */}
      <div style={{ marginBottom: 10, borderColor: 'white', borderStyle: 'solid', borderWidth: 0, borderBottomWidth: 1 }}>
        <Navbar projectname={activeProjectName} />
      </div>
      <div style={{ display: 'flex' }}>
        {!treeLoading && !loading && <div style={{ flex: 0.2, backgroundColor: colors.light, borderRadius: 10, color: 'white', marginRight: 10, marginLeft: 10 }}>
          <Main initialTreeState={treeState} />
        </div>}
        {loading && treeLoading && <CircularProgress />}
        {!treeLoading && !loading &&
          <div style={{ flex: 0.9 }}>
            <Monaco roomId={inviteLink} />
          </div>
        }
      </div>
    </div>

  )
}

export default Collaborate