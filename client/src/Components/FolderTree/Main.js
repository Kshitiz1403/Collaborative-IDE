import React, { useLayoutEffect, useState } from 'react'
import Tree from './Tree/Tree'

const Main = ({ initialTreeState }) => {

    let [data, setData] = useState([...initialTreeState])

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

    return (<div>
        <div style={{ margin: 20, fontSize: 20, fontWeight: 'bold' }}>
            Files
        </div>
        <Tree data={data} onUpdate={handleUpdate} onNodeClick={handleClick} />
    </div>
    )
}

export default Main