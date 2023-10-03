import { useState } from 'react'
function useOnAddFolder(explorer, isAdd, handleInsertNode, handleRenameNode, showInput, setShowInput) {
    const [inputError, setInputError] = useState(false)
    const onAddFolder = (e, regex) => {
        if (e.keyCode === 13 && e.target.value) {

            if (regex.test(e.target.value)) {

                if (isAdd) {
                    handleInsertNode(explorer.id, e.target.value, showInput.isRoot)
                } else {
                    handleRenameNode(explorer.id, e.target.value);
                }
                setShowInput({ ...showInput, visible: false });
            }
            else {
                setInputError(true)
                setShowInput({ ...showInput, visible: true });
            }


            // 
        }
    };

    return [onAddFolder, inputError];
}

export default useOnAddFolder;