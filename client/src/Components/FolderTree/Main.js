import React, { useLayoutEffect, useState } from 'react'

import Tree from './Tree/Tree'

const structure = [
    {
        type: "folder",
        name: "client",
        files: [
            {
                type: "folder",
                name: "ui",
                files: [
                    { type: "file", name: "Toggle.js" },
                    { type: "file", name: "Button.js" },
                    { type: "file", name: "Button.style.js" }
                ]
            },
            {
                type: "folder",
                name: "components",
                files: [
                    { type: "file", name: "Tree.js" },
                    { type: "file", name: "Tree.style.js" }
                ]
            },
            { type: "file", name: "setup.js" },
            { type: "file", name: "setupTests.js" }
        ]
    },
    {
        type: "folder",
        name: "packages",
        files: [
            {
                type: "file",
                name: "main.js"
            }
        ]
    },
    { type: "file", name: "index.js" }
];


const Main = () => {

    let [data, setData] = useState(structure)

    const handleClick = (node) => {
        if (node.node.type === "file") {
            let ob = { str: "" };
            getExactFilePath(node.node, ob);
            console.log(ob.str);
        }
    };

    const getExactFilePath = (node, ob) => {
        // either bottom -top
        if (!(typeof node === "object" && !Array.isArray(node) && node != null)) {
            return;
        }
        getExactFilePath(node.parentNode, ob);
        if (node.type === "folder") {
            ob.str += `${node.name}/`;
        }
        if (node.type === "file") {
            ob.str += node.name;
        }
    };
    const handleUpdate = (state) => {
        console.log(state);
        localStorage.setItem(
            "tree",
            JSON.stringify(state, function (key, value) {
                if (key === "parentNode" || key === "id") {
                    return null;
                }
                return value;
            })
        );
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

    return (
        <Tree data={data} onUpdate={handleUpdate} onNodeClick={handleClick} />
    )
}

export default Main