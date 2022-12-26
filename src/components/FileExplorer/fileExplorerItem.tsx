import React from 'react';
import { FaFolder, FaFile } from 'react-icons/fa';
import { Item } from '../../types';

interface FileExplorerItemProps {
    item: Item;
    onNavigate: (item: Item) => void;
    onToggleSelection: (item: Item) => void;
    selected: boolean;
}

const FileExplorerItem: React.FC<FileExplorerItemProps> = ({ item, onNavigate, selected, onToggleSelection }) => {
    const handleClick = () => {
        onToggleSelection(item);
        if (item.type === 'folder') {
            onNavigate(item);
        }
    };

    return (
        <div
            className={`flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-4 py-2 ${selected ? 'bg-blue-500' : ''}`}
            onClick={handleClick}
        >
            {item.type === 'folder' ? <FaFolder className="w-6 h-6 mr-4 text-gray-500" /> : <FaFile className="w-6 h-6 mr-4 text-gray-500" />}
            <span className="text-gray-700 text-sm font-medium">{item.name}</span>
        </div>
    );
};

export default FileExplorerItem;
