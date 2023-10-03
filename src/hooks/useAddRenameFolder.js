import { useState } from 'react'

function useAddRenameFolder() {

    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isRoot: false,
    });
    const [isAdd, setIsAdd] = useState(false);
    const [placeHolder, setPlaceHolder] = useState("Folder Name");

    const handleAddRenameFolder = (e, isRoot, add) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isRoot,
        });

        add ? setPlaceHolder('Add Folder Name') : setPlaceHolder('Rename Folder');
        setIsAdd(add);
    };

    return [setExpand, expand, setShowInput, showInput, isAdd, placeHolder, handleAddRenameFolder];
}

export default useAddRenameFolder;