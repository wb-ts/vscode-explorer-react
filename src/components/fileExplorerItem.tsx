import React, { useState } from 'react';
import { FaFolder, FaFile } from 'react-icons/fa';
import { Item } from '../types';

interface Props {
    item: Item;
    selected: boolean;
    onNavigate: (item: Item) => void;
    expandedItem?: Item;
    onToggleSelection: (item: Item) => void;
    handleExpandFolder: (item:Item) => void;
    handleSelectChild:(item:Item)=>void;
}

const FileExplorerItem: React.FC<Props> = ({ item, selected, onNavigate, onToggleSelection, handleExpandFolder, expandedItem,handleSelectChild }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        if (item.type === 'folder') {    
            handleExpandFolder(item);
        }
        setExpanded(!expanded);
    };
    const handleClickSubFolder=(subFolder:Item)=>{
        handleSelectChild(subFolder);
    }

    return (
        <div className={`relative p-2   ${expandedItem !==undefined && (expandedItem.id==item.id   && 'bg-white')}`} >
            <div className="flex items-center cursor-pointer"  onClick={handleExpand}>
                {item.type === 'folder' && (
                    <FaFolder className="w-6 h-6 text-gray-400" />
                )}
                {item.type === 'file' && (
                    <FaFile className="w-6 h-6 text-gray-400" />
                )}
                <span className="ml-3 text-sm leading-5 text-gray-600">
                    {item.name}
                </span>
            </div>
            {expandedItem !==undefined && (expandedItem.id==item.id && item.children && (
                <div className="ml-12">
                    {item.children.length > 0 ? item.children.map((child) => (
                        <div className="hover:bg-gray-300" onClick={() => handleClickSubFolder(child)}>

                            <FileExplorerItem
                                handleSelectChild={handleClickSubFolder}
                                key={child.id}
                                item={child}
                                selected={selected}
                                onNavigate={onNavigate}
                                handleExpandFolder={handleExpandFolder}
                                onToggleSelection={onToggleSelection}
                            />
                        </div>
                    )):
                    <div className="">No files registered in this folder</div>
                    }
                </div>
            ))}
        </div>
    );
};

export default FileExplorerItem;
