import React, { useLayoutEffect, useState } from 'react'
import Tree from './Tree/Tree'
import { VscRefresh } from "react-icons/vsc";
import useTree from '../../hooks/useTree';
import IconButton from '@mui/material/IconButton';

const Main = ({ initialTreeState }) => {

    let [data, setData] = useState([...initialTreeState])
    const { getTree } = useTree()

    const handleClick = (node) => {
    };

    const handleUpdate = (state) => {
        // localStorage.setItem(
        //     "tree",
        //     JSON.stringify(state, function (key, value) {
        //         if (key === "parentNode" || key === "id") {
        //             return null;
        //         }
        //         return value;
        //     })
        // );
    };

    useLayoutEffect(() => {
        try {
            let savedStructure = JSON.parse(localStorage.getItem("tree"));
            if (savedStructure) {
                setData(savedStructure);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleRefresh = () => {
        getTree()
            .then(result => setData(result))
            .catch(err => console.error(err))
    }

    return (<div>
        <div style={{ margin: 20, fontSize: 20, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Files
            <abbr title='Refresh'>
                <IconButton onClick={handleRefresh} color='primary'>
                    <VscRefresh color='whitesmoke' />
                </IconButton>
            </abbr>

        </div>
        <Tree data={data} onUpdate={handleUpdate} onNodeClick={handleClick} />
    </div>
    )
}

export default Main