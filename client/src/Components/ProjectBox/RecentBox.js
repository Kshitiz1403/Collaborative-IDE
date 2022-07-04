import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import RecentProjectBox from './RecentProjectBox'

const RecentBox = ({ data }) => {
    const navigate = useNavigate()
    const { username } = useAuth()
    return (
        <div>
            {data.map((item) => <div key={item.name + item.username} style={{ display: 'inline-block', marginRight: 10, marginTop: 10 }}><RecentProjectBox language={item.language} created="2 days ago" projectName={item.name} onClick={() => navigate(`@${username}/${item.name}`)} /></div>
            )}
        </div>
    )
}

export default RecentBox