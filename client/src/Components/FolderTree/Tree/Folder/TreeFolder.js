import React, { useState, useEffect } from 'react';
import {
   AiOutlineFolderAdd,
   AiOutlineFileAdd,
   AiOutlineFolder,
   AiOutlineFolderOpen,
   AiOutlineDelete,
   AiOutlineEdit,
} from 'react-icons/ai';

import { ActionsWrapper, Collapse, StyledName, StyledNameText, VerticalLine } from '../Tree.style';
import { StyledFolder } from './TreeFolder.style';

import { FILE, FOLDER } from '../state/constants';
import { useTreeContext } from '../state/TreeContext';
import { PlaceholderInput } from '../TreePlaceholderInput';

import { getExactFilePath, shortenText } from '../../utils';
import useFileService from '../../../../hooks/api/fileService';

const FolderName = ({ isOpen, name, handleClick }) => (
   <StyledName onClick={handleClick}>
      <div>{isOpen ? <AiOutlineFolderOpen color="#ffffff" /> : <AiOutlineFolder color="#ffffff" />}</div>
      <StyledNameText>{shortenText(name)}</StyledNameText>
   </StyledName>
);

const Folder = ({ id, name, children, node }) => {
   const { dispatch, isImparative, onNodeClick } = useTreeContext();
   const [isEditing, setEditing] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [childs, setChilds] = useState([]);
   const handleFiles = useFileService();

   useEffect(() => {
      setChilds([children]);
   }, [children]);

   const commitFolderCreation = async name => {
      let relativePath = getExactFilePath(node);
      await handleFiles.createFolder({ relativePath, folder_name: name });
      dispatch({ type: FOLDER.CREATE, payload: { id, name } });
   };
   const commitFileCreation = async name => {
      let path = getExactFilePath(node);

      await handleFiles.saveFile({ relativePath: path, name: name });
      dispatch({ type: FILE.CREATE, payload: { id, name } });
   };

   const commitDeleteFolder = async () => {
      let path = getExactFilePath(node);
      await handleFiles.deleteRes({ relativePath: path, name: '' });
      dispatch({ type: FOLDER.DELETE, payload: { id } });
   };
   const commitFolderEdit = async name => {
      let oldPath = getExactFilePath(node);
      let newPath = oldPath.slice(0, oldPath.length - node.name.length - 1) + name;
      await handleFiles.rename({ old_name: oldPath, new_name: newPath });
      dispatch({ type: FOLDER.EDIT, payload: { id, name } });

      setEditing(false);
   };

   const handleCancel = () => {
      setEditing(false);
      setChilds([children]);
   };

   const handleNodeClick = React.useCallback(
      event => {
         event.stopPropagation();
         onNodeClick({ node });
      },
      [node],
   );

   const handleFileCreation = event => {
      event.stopPropagation();
      setIsOpen(true);
      setChilds([
         ...childs,
         <PlaceholderInput key={Math.random()} type="file" onSubmit={commitFileCreation} onCancel={handleCancel} />,
      ]);
   };

   const handleFolderCreation = event => {
      event.stopPropagation();
      setIsOpen(true);
      setChilds([
         ...childs,
         <PlaceholderInput key={Math.random()} type="folder" onSubmit={commitFolderCreation} onCancel={handleCancel} />,
      ]);
   };

   const handleFolderRename = () => {
      setIsOpen(true);
      setEditing(true);
   };

   const isNonRootFolder = node => {
      const parentNode = node.parentNode;
      if (typeof parentNode === 'object' && !Array.isArray(parentNode) && parentNode !== null) {
         return true;
      }
      return false;
   };

   return (
      <StyledFolder id={id} onClick={handleNodeClick} className="tree__folder">
         <VerticalLine>
            <ActionsWrapper>
               {isEditing ? (
                  <PlaceholderInput
                     type="folder"
                     style={{ paddingLeft: 0 }}
                     defaultValue={name}
                     onCancel={handleCancel}
                     onSubmit={commitFolderEdit}
                  />
               ) : (
                  <FolderName name={name} isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
               )}

               {isImparative && (
                  <div className="actions">
                     {isNonRootFolder(node) && <AiOutlineEdit onClick={handleFolderRename} />}
                     <AiOutlineFileAdd onClick={handleFileCreation} />
                     <AiOutlineFolderAdd onClick={handleFolderCreation} />
                     {isNonRootFolder(node) && <AiOutlineDelete onClick={commitDeleteFolder} />}
                  </div>
               )}
            </ActionsWrapper>
            <Collapse className="tree__folder--collapsible" isOpen={isOpen}>
               {childs}
            </Collapse>
         </VerticalLine>
      </StyledFolder>
   );
};

export { Folder, FolderName };
