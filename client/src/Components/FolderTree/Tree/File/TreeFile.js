import React, { useRef, useState } from "react";
import { AiOutlineFile, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { StyledFile } from "./TreeFile.style";
import { useTreeContext } from "../state/TreeContext";
import { ActionsWrapper, StyledName } from "../Tree.style.js";
import { PlaceholderInput } from "../TreePlaceholderInput";

import { FILE } from "../state/constants";
import FILE_ICONS from "../FileIcons";

import useFiles from "../../../../hooks/useFiles";
import { getExactFilePath } from "../../utils";

const File = ({ name, id, node }) => {
  const { dispatch, isImparative, onNodeClick } = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const ext = useRef("");
  const handleFiles = useFiles()

  let splitted = name?.split(".");
  ext.current = splitted[splitted.length - 1];

  const toggleEditing = () => setEditing(!isEditing);
  const commitEditing = (name) => {
    let oldPath = getExactFilePath(node)
    let prevFile = oldPath.split('/').pop()
    let newPath = oldPath.slice(0, oldPath.length - prevFile.length) + name

    handleFiles.rename(oldPath, newPath).then(() => {
      dispatch({ type: FILE.EDIT, payload: { id, name } });
    })
    setEditing(false);
  };
  const commitDelete = () => {    
    let path = getExactFilePath(node)

    handleFiles.deleteFile(path).then(() => {
      dispatch({ type: FILE.DELETE, payload: { id } });
    })
  };
  const handleNodeClick = React.useCallback(
    (e) => {
      e.stopPropagation();
      onNodeClick({ node });
    },
    [node]
  );
  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <StyledFile onClick={handleNodeClick} className="tree__file">
      {isEditing ? (
        <PlaceholderInput
          type="file"
          style={{ paddingLeft: 0 }}
          defaultValue={name}
          onSubmit={commitEditing}
          onCancel={handleCancel}
        />
      ) : (
        <ActionsWrapper>
          <StyledName>
            {FILE_ICONS[ext.current] ? (
              FILE_ICONS[ext.current]
            ) : (
              <AiOutlineFile />
            )}
            &nbsp;&nbsp;{name}
          </StyledName>
          {isImparative && (
            <div className="actions">
              <AiOutlineEdit onClick={toggleEditing} />
              <AiOutlineDelete onClick={commitDelete} />
            </div>
          )}
        </ActionsWrapper>
      )}
    </StyledFile>
  );
};

export { File };
