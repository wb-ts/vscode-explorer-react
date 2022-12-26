import React, { useState } from 'react';
import FileExplorerItem from './fileExplorerItem';
import { Item } from '../../types';
import NewFileModal from '../modals/newFileModal';
import NewFolderModal from '../modals/newFolderModal';
import ChooseFolderModal from '../modals/chooseFolderModal';

export const FileExplorer: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [path, setPath] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const [showNewFileModal, setShowNewFileModal] = useState(false);
    const [showNewFolderModal, setShowNewFolderModal] = useState(false);
    const [showChooseFolderModal, setShowChooseFolderModal] = useState(false);

    const handleNavigate = (item: Item) => {
        if (item.type === 'folder') {
            setPath(item.path);
        }
    };

    const handleMove = (src: string[], dest: string[]) => {
        // implement handleMove function
    };

    const handleCreateFile = (path: string, name: string) => {
        // implement handleCreateFile function
        setShowNewFileModal(false);
    };

    const handleCreateFolder = (path: string, name: string) => {
        // implement handleCreateFolder function
        setShowNewFolderModal(false);
    };

    const handleChooseFolder = (path: string, files: FileList) => {
        // implement handleChooseFolder function
        setShowChooseFolderModal(false);
    };

    const handleToggleSelection = (item: Item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((i) => i !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleClearSelection = () => {
        setSelectedItems([]);
    };
    return (
        <div className="relative">
            <div className="bg-gray-900 p-4 flex items-center justify-between">
                <div>
                    <button
                        className="px-2 py-1 rounded-md text-sm font-medium leading-5 bg-gray-800 text-white focus:outline-none focus:text-gray-100 focus:bg-gray-700 transition duration-150 ease-in-out"
                        onClick={() => setPath(path.slice(0, -1))}
                    >
                        Back
                    </button>
                    <button
                        className="ml-3 px-2 py-1 rounded-md text-sm font-medium leading-5 bg-gray-800 text-white focus:outline-none focus:text-gray-100 focus:bg-gray-700 transition duration-150 ease-in-out"
                        onClick={() => setShowNewFileModal(true)}
                    >
                        New File
                    </button>
                    <button
                        className="ml-3 px-2 py-1 rounded-md text-sm font-medium leading-5 bg-gray-800 text-white focus:outline-none focus:text-gray-100 focus:bg-gray-700 transition duration-150 ease-in-out"
                        onClick={() => setShowNewFolderModal(true)}
                    >
                        New Folder
                    </button>
                    <button
                        className="ml-3 px-2 py-1 rounded-md text-sm font-medium leading-5 bg-gray-800 text-white focus:outline-none focus:text-gray-100 focus:bg-gray-700 transition duration-150 ease-in-out"
                        onClick={() => setShowChooseFolderModal(true)}
                    >
                        Choose Folder
                    </button>
                </div>
                <div>
                    <button
                        className="px-2 py-1 rounded-md text-sm font-medium leading-5 bg-gray-800 text-white focus:outline-none focus:text-gray-100 focus:bg-gray-700 transition duration-150 ease-in-out"
                        onClick={handleClearSelection}
                    >
                        Clear Selection
                    </button>
                    <button
                        className="ml-3 px-2 py-1 rounded-md text-sm font-medium leading-5 bg-gray-800 text-white focus:outline-none focus:text-gray-100 focus:bg-gray-700 transition duration-150 ease-in-out"
                        onClick={() => {
                            // implement handleMove function
                        }}
                    >
                        Move
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center mt-4">
                {/* <div className="w-full flex flex-col items-center">
                    {path.map((p) => (
                        <div
                            key={p}
                            className="text-xs font-medium leading-5 text-gray-300 uppercase tracking-wider"
                        >
                            {p}
                        </div>
                    ))}
                </div> */}
                <div className="w-full mt-4 grid grid-cols-4 gap-4">
                    {items.map((item) => (
                        <FileExplorerItem
                            key={item.id}
                            item={item}
                            selected={selectedItems.includes(item)}
                            onNavigate={handleNavigate}
                            onToggleSelection={handleToggleSelection}
                        />
                    ))}
                </div>
            </div>
            {showNewFileModal && (
                <NewFileModal
                    path={path}
                    onCreate={handleCreateFile}
                    onClose={() => setShowNewFileModal(false)}
                />
            )}
            {showNewFolderModal && (
                <NewFolderModal
                    path={path}
                    onCreate={handleCreateFolder}
                    onClose={() => setShowNewFolderModal(false)}
                />
            )}
            {showChooseFolderModal && (
                <ChooseFolderModal
                    path={path}
                    onChoose={handleChooseFolder}
                    onClose={() => setShowChooseFolderModal(false)}
                />
            )}
        </div>
    );
};

