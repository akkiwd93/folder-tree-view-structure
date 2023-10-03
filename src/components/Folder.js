import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderPlus,
  faTrash,
  faPenToSquare,
  faFolder,
  faKeyboard
} from "@fortawesome/free-solid-svg-icons";

import useAddRenameFolder from "../hooks/useAddRenameFolder";
import useOnAddFolder from "../hooks/useOnAddFolder";

const iconBoxStyle = {
  margin: "0 5px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
};

const iconLabelStyle = {
  margin: "0 0 0 3px",
  fontSize: "small",
};
const iconFolderLabelStyle = {
  margin: "0 0 0 3px",
  fontSize: "15px",
};

function Folder(props) {
  const { handleInsertNode = () => { }, handleRenameNode = () => { }, handleDeleteNode = () => { }, explorer } = props
  const [setExpand, expand, setShowInput, showInput, isAdd, placeHolder, handleAddRenameFolder] = useAddRenameFolder()
  const [onAddFolder, inputError] = useOnAddFolder(explorer, isAdd, handleInsertNode, handleRenameNode, showInput, setShowInput)

  const handleDeleteFolder = (e) => {
    e.stopPropagation();
    handleDeleteNode(explorer.id);

    setExpand(true);
  };

  return (

    Object.keys(explorer).length ? <div style={{ marginTop: 5 }}>
      <div onClick={() => setExpand(!expand)} className="folder">
        <span onClick={(e) => explorer.isRoot && handleAddRenameFolder(e, false, true)}>
          {explorer.isRoot || !explorer.items.length ? <FontAwesomeIcon icon={faFolder} size={explorer.isRoot ? 'xl' : 'md'} /> : <FontAwesomeIcon icon={faFolderPlus} size='md' />}
          <span style={iconFolderLabelStyle}>{explorer.name}</span>
        </span>
        {!explorer.isRoot &&
          <div style={{ display: "flex" }}>
            <button
              style={iconBoxStyle}
              onClick={(e) => handleAddRenameFolder(e, false, true)}
            >
              <FontAwesomeIcon icon={faFolderPlus} size="s" />
              <span style={iconLabelStyle}> Add </span>
            </button>
            <button style={iconBoxStyle} onClick={(e) => handleDeleteFolder(e)}>
              <FontAwesomeIcon icon={faTrash} size="s" />
              <span style={iconLabelStyle}> Remove </span>
            </button>
            <button
              style={iconBoxStyle}
              onClick={(e) =>
                handleAddRenameFolder(e, explorer.isRoot, false)
              }
            >
              <FontAwesomeIcon icon={faPenToSquare} size="s" />
              <span style={iconLabelStyle}> Rename </span>
            </button>
          </div>
        }
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput.visible && (
          <div className="inputContainer">
            <span>
              <FontAwesomeIcon icon={faKeyboard} />
            </span>

            <input
              type="text"
              placeholder={placeHolder}
              className="inputContainer__input"
              autoFocus
              onKeyDown={(e) => onAddFolder(e, /^[a-zA-Z0-1]+$/)}
              onBlur={() => setShowInput({ ...showInput, visible: false })}
            />
            {inputError && <span style={{ color: 'red' }}>Please don't use any special characters, you can only use character a-z, A-Z or 0-9 </span>}

          </div>
        )}

        {explorer.items.map((exp) => {
          return (
            <Folder
              handleInsertNode={handleInsertNode}
              handleRenameNode={handleRenameNode}
              handleDeleteNode={handleDeleteNode}
              key={exp.id}
              explorer={exp}
            />
          );
        })}
      </div>
    </div > : null
  );

}

export default Folder;
