import React, { useState } from 'react';
import { FaFolder, FaFile} from 'react-icons/fa';
import { Item } from '../types';
import { useDrop, useDrag } from "react-dnd";
import {AiTwotoneDelete} from 'react-icons/ai'
interface Props {
    item: Item;
    selected: boolean;
    onNavigate: (item: Item) => void;
    expandedItem?: Item;
    onToggleSelection: (item: Item) => void;
    handleExpandFolder: (item: Item) => void;
    handleSelectChild: (item: Item) => void;
    allItems: Item[];
    updateFolder: (updatedFolder: Item[]) => void;
    itemIndex: number;
    getFiles: () => Item[];
}

const FileExplorerItem: React.FC<Props> = ({ item, itemIndex, selected, onNavigate, onToggleSelection, handleExpandFolder, expandedItem, handleSelectChild, allItems, updateFolder, getFiles }) => {
    const [expanded, setExpanded] = useState(false);
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false)
    const handleExpand = () => {
        if (item.type === 'folder') {
            handleExpandFolder(item);
        }
        setExpanded(!expanded);
    };
    const handleClickSubFolder = (subFolder: Item) => {
        handleSelectChild(subFolder);
    }


    const addElementToFolder = (newElement: Item) => {
        var folderElements = allItems;
        folderElements.map(element => {
            if (element.id == newElement.id) {
                element.parent = item.id
            }
            return element
        })
        localStorage.setItem("folders", JSON.stringify(folderElements))
        var updatedFiles: Item[] = getFiles()
        updateFolder(updatedFiles)
    };
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "component",
        drop: (newElement: Item) => addElementToFolder(newElement),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "component",
        item: item,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    function deleteElement() {
        var folderElements = allItems;
        var updatedFolder=folderElements.filter((element)=>element.id!==item.id || element.parent!==item.parent)
        localStorage.setItem("folders", JSON.stringify(updatedFolder))
        var updatedFiles: Item[] = getFiles()
        updateFolder(updatedFiles)
    }
    return (
        item.type == "folder" ?
            <div onMouseOver={() => setDeleteButtonVisible(true)} onMouseOut={() => setDeleteButtonVisible(false)} ref={drop} className={`relative p-2 w-full   ${expandedItem !== undefined && (expandedItem.id == item.id && 'bg-white')}`} >
                <div className="flex items-center cursor-pointer w-full " >
                    {item.type === 'folder' && (
                        <FaFolder className="w-6 h-6 text-gray-400" onClick={handleExpand} />
                    )}

                    <div className="ml-3 text-sm flex w-full flex-row justify-between leading-5 text-gray-600">
                        <span>{item.name}</span>
                        {deleteButtonVisible && <AiTwotoneDelete className="w-6 h-5 text-red-600 hover:text-red-700" onClick={() => deleteElement()} />}
                    </div>
                </div>
                {expandedItem !== undefined && (expandedItem.id == item.id && item.children && (
                    <div className="ml-12">
                        {item.children.length > 0 ? item.children.map((child, i) => (
                            <div className="hover:bg-gray-300" onClick={() => handleClickSubFolder(child)}>

                                <FileExplorerItem
                                    itemIndex={i}
                                    allItems={allItems}
                                    key={child.id}
                                    item={child}
                                    getFiles={getFiles}
                                    updateFolder={updateFolder}
                                    handleSelectChild={handleClickSubFolder}
                                    selected={selected}
                                    onNavigate={onNavigate}
                                    handleExpandFolder={handleExpandFolder}
                                    onToggleSelection={onToggleSelection}
                                />
                            </div>
                        )) :
                            <div className="">No files registered in this folder</div>
                        }
                    </div>
                ))}
            </div>
            :
            <div onMouseOver={() => setDeleteButtonVisible(true)} onMouseOut={() => setDeleteButtonVisible(false)} ref={drag} className={`relative p-2   ${expandedItem !== undefined && (expandedItem.id == item.id && 'bg-white')}`} >
                <div className="flex items-center cursor-pointer w-full " onClick={handleExpand}>

                    {item.type === 'file' && (
                        <FaFile className="w-6 h-6 text-gray-400" onClick={handleExpand} />
                    )}
                    <div className="ml-3 text-sm flex w-full flex-row justify-between leading-5 text-gray-600">
                        <span>{item.name}</span>
                        {deleteButtonVisible && <AiTwotoneDelete className="w-6 h-5 text-red-600 hover:text-red-700" onClick={() => deleteElement()} />}
                    </div>
                </div>
                {expandedItem !== undefined && (expandedItem.id == item.id && item.children && (
                    <div className="ml-12">
                        {item.children.length > 0 ? item.children.map((child, i) => (
                            <div className="hover:bg-gray-300" onClick={() => handleClickSubFolder(child)}>
]
                                <FileExplorerItem
                                    itemIndex={i}
                                    allItems={allItems}
                                    key={child.id}
                                    item={child}
                                    getFiles={getFiles}
                                    updateFolder={updateFolder}
                                    handleSelectChild={handleClickSubFolder}
                                    selected={selected}
                                    onNavigate={onNavigate}
                                    handleExpandFolder={handleExpandFolder}
                                    onToggleSelection={onToggleSelection}
                                />
                            </div>
                        )) :
                            <div className="">No files registered in this folder</div>
                        }
                    </div>
                ))}
            </div>
    );
};

export default FileExplorerItem;