import React, { useState, useEffect } from 'react';
import FileExplorerItem from './fileExplorerItem';
import { Item } from '../types';
import NewFileModal from './modals/newFileModal';
import NewFolderModal from './modals/newFolderModal';
import ChooseFolderModal from './modals/chooseFolderModal';

interface FoldersResponse {
    files: string[]
}

const FileExplorer: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [parent, setParent] = useState<string>('/');
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const [showNewFileModal, setShowNewFileModal] = useState(false);
    const [showNewFolderModal, setShowNewFolderModal] = useState(false);
    const [showChooseFolderModal, setShowChooseFolderModal] = useState(false);
    const [expandedItem, setExpandedItem] = useState<Item>()
    const [allItems, setAllItems] = useState<Item[]>([])
    useEffect(() => {
        function getItemsLocalStorage() {
            var folders = localStorage.getItem('folders');
            if (folders === null) {
                var emptyItemsArray: Item[] = [];
                localStorage.setItem('folders', JSON.stringify(emptyItemsArray));
                setItems(emptyItemsArray)
            }
            else {
                var storedValues = getFiles();
                setItems(storedValues)
            }
            console.log(folders)
        }
        getItemsLocalStorage()
    }, [parent]);

    function getFiles(): Item[] {
        var foldersString: string | null = localStorage.getItem('folders');
        var storedValue: Item[] = JSON.parse(String(foldersString));
        var allStorageItems: Item[] = storedValue
        setAllItems(storedValue)
        storedValue = storedValue.filter((item, i) => item.parent == parent)
        var storedValueWithChildren: Item[] = []
        storedValue.forEach((item, i) => {
            if (item.type == "folder") {

                var children = allStorageItems && allStorageItems.filter(child => child.parent == item.id)
                item.children = children;
                console.log("children", children)
            }
            storedValueWithChildren.push(item)
        })
        return storedValueWithChildren
    }

    const handleNavigate = (item: Item) => {
        if (item.type === 'folder') {
            setParent(item.parent);
        }
    };

    const handleExpandFolder = (item: Item) => {
        console.log("expanded")
        if (expandedItem) {
            expandedItem.id == item.id ? setExpandedItem(undefined) : setExpandedItem(item)
        }
        else {
            setExpandedItem(item)
        }
    }
    const handleMove = (src: string[], dest: string[]) => {
        // implement handleMove function
    };

    const handleCreateFile = (name: string) => {
        // implement handleCreateFile function
        var myFolders: Item[] = allItems;
        var newFile: Item = {
            id: `folderElement${myFolders.length + 1}`,
            name,
            type: "file",
            parent: expandedItem !== undefined ? expandedItem.id : parent

        }
        myFolders.push(newFile);
        localStorage.setItem("folders", JSON.stringify(myFolders))
        var updatedFolders = getFiles()
        setItems(updatedFolders)
        setShowNewFolderModal(false);
        // console.log({expandedItem., name});

        setShowNewFileModal(false);
    };

    const handleCreateFolder = (name: string) => {
        // implement handleCreateFolder function
        var myFolders: Item[] = allItems;
        var children: Item[] = []
        var newFolder: Item = {
            id: `folderElement${myFolders.length + 1}`,
            name,
            type: "folder",
            parent: expandedItem !== undefined ? expandedItem.id : parent

        }
        myFolders.push(newFolder);
        localStorage.setItem("folders", JSON.stringify(myFolders))
        var updatedFolders = getFiles()
        setItems(updatedFolders)
        setShowNewFolderModal(false);
        // console.log({expandedItem., name});

    };

    const handleChooseFolder = (item: Item) => {
        setParent(item.id)
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
    const handleBackNavigate = () => {
        if (parent !== "/") {

            var currentParent: Item | undefined = allItems.find(item => item.id == parent);
            console.log(`${parent} parent is`, currentParent)
            var newP: string | undefined = (currentParent) ? `${currentParent?.parent}` : parent
            setParent(newP)
        }
    }
    return (
        <div className="relative">
            <div className="bg-gray-900 p-4 flex items-center justify-between pr-5">
                <div>
                    <button
                        className="px-2 py-1 rounded-md text-sm font-medium leading-5 bg-gray-800 text-white focus:outline-none focus:text-gray-100 focus:bg-gray-700 transition duration-150 ease-in-out"
                        onClick={() => handleBackNavigate()}
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
                    {/* <button
                        className="ml-3 px-2 py-1 rounded-md text-sm font-medium leading-5 bg-gray-800 text-white focus:outline-none focus:text-gray-100 focus:bg-gray-700 transition duration-150 ease-in-out"
                        onClick={() => setShowChooseFolderModal(true)}
                    >
                        Choose Folder
                    </button> */}
                </div>
                <p className='text-white'>

                    current folder: {(allItems.find(item => item.id === parent)?.name) ? allItems.find(item => item.id === parent)?.name : "/"}
                </p>
            </div>
            <div className="flex flex-col items-center mt-4">
                <div className="w-full mt-4 flex flex-col space-y-3">
                    {items.length > 0 ? (items.map((item) => (
                        <FileExplorerItem
                            key={item.id}
                            item={item}
                            handleSelectChild={handleChooseFolder}
                            selected={selectedItems.includes(item)}
                            onNavigate={handleNavigate}
                            handleExpandFolder={handleExpandFolder}
                            expandedItem={expandedItem}
                            onToggleSelection={handleToggleSelection}
                        />
                    ))) : (
                        <div className="text-center text-gray-600 flex flex-col w-full items-center pb-8 ">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mt-2 text-lg">No files available! you can create a folder to work in.</p>
                        </div>
                    )}
                </div>
            </div>
            {showNewFileModal && (
                <NewFileModal
                    onCreate={handleCreateFile}
                    onClose={() => setShowNewFileModal(false)}
                />
            )}
            {showNewFolderModal && (
                <NewFolderModal
                    onCreate={handleCreateFolder}
                    onClose={() => setShowNewFolderModal(false)}
                />
            )}
            {/* {showChooseFolderModal && (
                <ChooseFolderModal
                    parent={parent}
                    onChoose={handleChooseFolder}
                    onClose={() => setShowChooseFolderModal(false)}
                />
            )} */}
        </div>
    );
};

export default FileExplorer;