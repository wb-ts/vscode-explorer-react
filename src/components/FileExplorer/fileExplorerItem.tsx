import React, { useState } from 'react';
import { FaFolder, FaFile } from 'react-icons/fa';
import { Item } from '../../types';

interface Props {
    item: Item;
    selected: boolean;
    onNavigate: (item: Item) => void;
    onToggleSelection: (item: Item) => void;
    handleSelectFolder: (folderName: string) => void;
}

const FileExplorerItem: React.FC<Props> = ({ item, selected, onNavigate, onToggleSelection, handleSelectFolder }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        if (item.type === 'folder') {
            handleSelectFolder(item.path);
        }
        setExpanded(!expanded);
    };


    return (
        <div className={`relative p-2 cursor-pointer  ${expanded && item.children ? 'bg-black' : ''}`} onClick={handleExpand}>
            <div className="flex items-center">
                {item.type === 'folder' && (
                    <FaFolder className="w-6 h-6 text-gray-400" onClick={handleExpand} />
                )}
                {item.type === 'file' && (
                    <FaFile className="w-6 h-6 text-gray-400" />
                )}
                <span className="ml-3 text-sm leading-5 text-gray-300">
                    {item.name}
                </span>
            </div>
            {expanded && item.children && (
                <div className="ml-12">
                    {item.children.length > 0 && item.children.map((child) => (
                        <div className="hover:bg-gray-700" onClick={() => { console.log("hhh") }}>

                            <FileExplorerItem

                                key={child.id}
                                item={child}
                                selected={selected}
                                onNavigate={onNavigate}
                                handleSelectFolder={handleSelectFolder}
                                onToggleSelection={onToggleSelection}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileExplorerItem;
