import React, { useState, useEffect } from "react";
import {
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

import {
  ActionsWrapper,
  Collapse,
  StyledName,
  VerticalLine,
} from "../Tree.style";
import { StyledFolder } from "./TreeFolder.style";

import { FILE, FOLDER } from "../state/constants";
import { useTreeContext } from "../state/TreeContext";
import { PlaceholderInput } from "../TreePlaceholderInput";

import useFiles from "../../../../hooks/useFiles";
import { getExactFilePath } from "../../utils";

const FolderName = ({ isOpen, name, handleClick }) => (
  <StyledName onClick={handleClick}>
    {isOpen ? <AiOutlineFolderOpen color="#ffffff" /> : <AiOutlineFolder color="#ffffff" />}
    &nbsp;&nbsp;{name}
  </StyledName>
);

const Folder = ({ id, name, children, node }) => {
  const { dispatch, isImparative, onNodeClick } = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [childs, setChilds] = useState([]);
  const handleFiles = useFiles()

  useEffect(() => {
    setChilds([children]);
  }, [children]);

  const commitFolderCreation = (name) => {
    let ob = { str: "" }
    getExactFilePath(node, ob)
    handleFiles.createFolder(ob.str + name).then(() => {
      dispatch({ type: FOLDER.CREATE, payload: { id, name } });
    })
  };
  const commitFileCreation = (name) => {
    let ob = { str: "" }
    getExactFilePath(node, ob)
    handleFiles.saveOrCreateFile(ob.str + name).then(() => {
      dispatch({ type: FILE.CREATE, payload: { id, name } });
    })
  };

  const commitDeleteFolder = () => {
    let ob = { str: "" }
    getExactFilePath(node, ob)
    handleFiles.deleteFile(ob.str).then(() => {
      dispatch({ type: FOLDER.DELETE, payload: { id } });
    })
  };
  const commitFolderEdit = (name) => {
    let oldPathObj = { str: "" }
    getExactFilePath(node, oldPathObj)
    let oldPath = oldPathObj.str
    let newPath = oldPath.slice(0, oldPath.length - node.name.length - 1) + name
    handleFiles.rename(oldPath, newPath).then(() => {
      dispatch({ type: FOLDER.EDIT, payload: { id, name } });
    })
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setChilds([children]);
  };

  const handleNodeClick = React.useCallback(
    (event) => {
      event.stopPropagation();
      onNodeClick({ node });
    },
    [node]
  );

  const handleFileCreation = (event) => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        key={Math.random()}
        type="file"
        onSubmit={commitFileCreation}
        onCancel={handleCancel}
      />,
    ]);
  };

  const handleFolderCreation = (event) => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        key={Math.random()}
        type="folder"
        onSubmit={commitFolderCreation}
        onCancel={handleCancel}
      />,
    ]);
  };

  const handleFolderRename = () => {
    setIsOpen(true);
    setEditing(true);
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
            <FolderName
              name={name}
              isOpen={isOpen}
              handleClick={() => setIsOpen(!isOpen)}
            />
          )}

          {isImparative && (
            <div className="actions">
              <AiOutlineEdit onClick={handleFolderRename} />
              <AiOutlineFileAdd onClick={handleFileCreation} />
              <AiOutlineFolderAdd onClick={handleFolderCreation} />
              <AiOutlineDelete onClick={commitDeleteFolder} />
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
