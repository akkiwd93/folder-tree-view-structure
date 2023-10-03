import React, { useState } from "react";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/useTraverseTree";
import "./styles.css";
import explorer from './data/folderData'

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode, renameNode } = useTraverseTree();

  const handleInsertNode = (folderId, label, isRoot) => {
    const finalTree = insertNode(explorerData, folderId, label, isRoot);
    setExplorerData(finalTree);
  };
  const handleDeleteNode = (folderId) => {
    const finalTree = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
  };
  const handleRenameNode = (folderId, label) => {
    const finalTree = renameNode(explorerData, folderId, label);
    setExplorerData(finalTree);
  };

  return (
    <div className="App">
      <Folder
        handleInsertNode={handleInsertNode}
        handleRenameNode={handleRenameNode}
        handleDeleteNode={handleDeleteNode}
        explorer={explorerData}
      />
    </div>
  );
}
