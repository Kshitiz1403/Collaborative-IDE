import React, { useEffect, useState } from 'react'
import useInviteLink from '../utils/useInviteLink'
import Navbar from '../Components/Collaborate/Navbar'
import Monaco from '../Components/Monaco/Monaco'

const Collaborate = ({ projectname }) => {

  const invite = useInviteLink()
  const [loading, setLoading] = useState(true)
  const [inviteLink, setInviteLink] = useState("")

  const getInviteLink = async () => {
    const data = await invite.generateIfNotPresent()
    setInviteLink(data.share)
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
  }, [loading])



  return (
    <div style={{  }}>
      <Navbar projectname={projectname} />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 0.1, backgroundColor: 'red' }}>

        </div>
        <div style={{ flex: 0.9 }}>
          <Monaco roomId={inviteLink} />
        </div>
      </div>
    </div>

  )
}

export default Collaborate