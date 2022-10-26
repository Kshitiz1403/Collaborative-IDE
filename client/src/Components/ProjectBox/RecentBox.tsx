import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import RecentProjectBox from './RecentProjectBox';

interface ProjectData {
   id: number;
   name: string;
   language: string;
   updatedAt: Date;
}

const RecentBox = ({ data }) => {
   const navigate = useNavigate();
   const { username } = useAuth();

   return (
      <div>
         {data.map(item => (
            <div key={item.id} style={{ display: 'inline-block', marginRight: 10, marginTop: 10 }}>
               <RecentProjectBox
                  language={item.language}
                  updated={item['updatedAt']}
                  projectName={item.name}
                  onClick={() => navigate(`@${username}/${item.name}`)}
               />
            </div>
         ))}
      </div>
   );
};

export default RecentBox;
