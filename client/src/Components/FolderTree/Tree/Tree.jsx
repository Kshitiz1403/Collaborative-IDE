import { useReducer, useLayoutEffect } from 'react';
import { v4 } from 'uuid';
import { ThemeProvider } from 'styled-components';

import { useDidMountEffect } from '../utils';
import { TreeContext, reducer } from './state';

import { StyledTree } from './Tree.style';
import { Folder } from './Folder/TreeFolder';
import { File } from './File/TreeFile';


const Tree = ({ children, data, onNodeClick, onUpdate }) => {
    const [state, dispatch] = useReducer(reducer, data);

    useLayoutEffect(() => {
        dispatch({ type: 'SET_DATA', payload: data });
    }, [data]);

    useDidMountEffect(() => {
        onUpdate && onUpdate(state);
    }, [state]);

    const isImparative = data && !children;

    return (
        <ThemeProvider theme={{ indent: 10 }}>
            <TreeContext.Provider
                value={{
                    isImparative,
                    state,
                    dispatch,
                    onNodeClick: node => {
                        onNodeClick && onNodeClick(node);
                    },
                }}
            >
                <StyledTree>{isImparative ? <TreeRecusive data={state} parentNode={state} /> : children}</StyledTree>
            </TreeContext.Provider>
        </ThemeProvider>
    );
};

const TreeRecusive = ({ data, parentNode }) => {
    return data.map(item => {
        item.parentNode = parentNode;
        if (!parentNode) {
            item.parentNode = data;
        }
        if (!item.id) item.id = v4();

        if (item.type === 'file') {
            return <File key={item.id} id={item.id} name={item.name} node={item} />;
        }
        if (item.type === 'folder') {
            return (
                <Folder key={item.id} id={item.id} name={item.name} node={item}>
                    <TreeRecusive parentNode={item} data={item.files} />
                </Folder>
            );
        }
    });
};

Tree.File = File;
Tree.Folder = Folder;

export default Tree;
