const useTraverseTree = () => {
  const insertNode = function (tree, folderId, label, isRoot) {

    if ((tree.id === folderId)) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: label,
        isRoot: isRoot,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, label, isRoot);
    });

    return { ...tree, items: latestNode };
  };

  function deleteNode(tree, folderId) {

    if (tree.id === folderId) {
      return null;
    }

    let filteredTree = [];
    filteredTree = tree.items
      .filter((item) => item.id !== folderId)
      .map((item) => deleteNode(item, folderId));

    return { ...tree, items: filteredTree };
  }

  function renameNode(tree, folderId, label) {
    if (tree.id === folderId) {
      tree.name = label;
      return tree;
    }

    let updatedItem = [];
    updatedItem = tree.items.map((obj) => {
      return renameNode(obj, folderId, label);
    });

    return { ...tree, items: updatedItem };
  }

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
