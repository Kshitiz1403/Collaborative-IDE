import React from 'react'
import { useLocation } from 'react-router-dom'

const Collaborate = (props) => {
  // console.log(props.location)
  console.log(useLocation().state)
  return (
    <div>Collaborate</div>
  )
}

export default Collaborate