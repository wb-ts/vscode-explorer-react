import React, { useState, useEffect } from 'react';
import FileExplorerItem from './fileExplorerItem';
import { Item } from '../../types';
import NewFileModal from '../modals/newFileModal';
import NewFolderModal from '../modals/newFolderModal';
import ChooseFolderModal from '../modals/chooseFolderModal';
import { generateItems } from '../../utils/item';
import { v4 as uuid } from 'uuid';

interface FoldersResponse {
    files: string[]
}

export const FileExplorer: React.FC = () => {
    const SERVER_URL = "https://etside.onrender.com";
    const [items, setItems] = useState<Item[]>([]);
    const [path, setPath] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const [showNewFileModal, setShowNewFileModal] = useState(false);
    const [showNewFolderModal, setShowNewFolderModal] = useState(false);
    const [showChooseFolderModal, setShowChooseFolderModal] = useState(false);
    const [lastExpandedItem, setLastExpandedItem] = useState<Item>()

    useEffect(() => {
        function changePath() {
            handleChooseFolder(path)
        }
        changePath()
    }, [path]);


    const handleNavigate = (item: Item) => {
        if (item.type === 'folder') {
            setPath(item.path);
        }
    };

    const handleSelectFolder = (folderName: string) => {
        setPath(folderName)
    }
    const handleMove = (src: string[], dest: string[]) => {
        // implement handleMove function
    };

    const handleCreateFile = (path: string, name: string) => {
        // implement handleCreateFile function
        setShowNewFolderModal(false);
        // console.log({lastExpandedItem., name});
        fetch(`${SERVER_URL}/files/create`, {
            method: 'POST',
            body: JSON.stringify({
                folder: path,
                type: "file",
                fileName: name
            }),
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => response.json()).then((data) => {
            var newP: string[] = path.split('\\\\')
            var newPath = newP.splice(newP.length - 1, 1).join('/')
            let folderElements: Item[] = getFiles(newPath, data.files)
            setItems(folderElements)

        }).catch(err => console.log(err))
        setShowNewFileModal(false);
    };

    const handleCreateFolder = (path: string, name: string) => {
        // implement handleCreateFolder function
        setShowNewFolderModal(false);
        // console.log({lastExpandedItem., name});
        fetch(`${SERVER_URL}/files/create`, {
            method: 'POST',
            body: JSON.stringify({
                folder: path,
                type: "folder",
                newFolderName: name
            }),
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => response.json()).then((data) => {
            var newP: string[] = path.split('\\\\')
            var newPath = newP.splice(newP.length - 1, 1).join('/')
            let folderElements: Item[] = getFiles(newPath, data.files)
            setItems(folderElements)

        }).catch(err => console.log(err))
    };

    const getFiles = (folderName: string, fileNames: string[]): Item[] => {
        var folderElements: Item[] = []
        fileNames.map((fileName: string, i: number) => {
            const fileNameParts = fileName.split('.');
            var thisFile: Item = {
                name: fileName,
                id: `${i}`,
                type: "file",
                path: `${folderName}/${fileName}`
            };
            // Get the last element of the split array (which should be the file extension)
            const fileExtension = fileNameParts[fileNameParts.length - 1];
            if (fileExtension === fileName) {
                thisFile.type = "folder";
                var subFolderElements: Item[] = [];
                console.log(`${folderName}/${fileName}`)
                fetch(`${SERVER_URL}/files`, {
                    method: 'POST',
                    body: JSON.stringify({ folder: `${folderName}/${fileName}` }),
                    headers: { 'Content-Type': 'application/json' },
                }).then((response) => response.json()).then((newData) => {
                    newData.files.length > 0 && newData.files.map((newFileName: string, i: number) => {
                        const newFileNameParts = newFileName.split('.')
                        var newThisFile: Item = {
                            name: newFileName,
                            id: `${i}`,
                            type: "file",
                            path: `${folderName}/${fileName}/${newFileName}`
                        }
                        const newFileExtension = newFileNameParts[newFileNameParts.length - 1];
                        if (newFileExtension === newFileName) {
                            newThisFile.type = "folder"
                        }

                        subFolderElements.push(newThisFile);
                    })

                })
                thisFile.children = subFolderElements
            }
            folderElements.push(thisFile)
        })
        return folderElements
    }

    const handleChooseFolder = (folderName: string) => {
        fetch(`${SERVER_URL}/files`, {
            method: 'POST',
            body: JSON.stringify({ folder: folderName }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data: FoldersResponse) => {
                let folderElements: Item[] = getFiles(folderName, data.files)
                setItems(folderElements)
            }
            )
            .catch((error) => console.error(error));

        // setItems([folder]);
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
        var newP: string[] = path.split('/')
        var newPath = newP.splice(newP.length - 1, 1).join('/')
        console.log(newPath)
        handleChooseFolder(newPath)
    }
    return (
        <div className="relative">
            <div className="bg-gray-900 p-4 flex items-center justify-between">
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
                    <button
                        className="ml-3 px-2 py-1 rounded-md text-sm font-medium leading-5 bg-gray-800 text-white focus:outline-none focus:text-gray-100 focus:bg-gray-700 transition duration-150 ease-in-out"
                        onClick={() => setShowChooseFolderModal(true)}
                    >
                        Choose Folder
                    </button>
                </div>

            </div>
            <div className="flex flex-col items-center mt-4">
                <div className="w-full mt-4 flex flex-col space-y-3">
                    {items.length > 0 ? (items.map((item) => (
                        <FileExplorerItem
                            key={item.id}
                            item={item}
                            selected={selectedItems.includes(item)}
                            onNavigate={handleNavigate}
                            handleSelectFolder={handleSelectFolder}
                            onToggleSelection={handleToggleSelection}
                        />
                    ))) : (
                        <div className="text-center text-gray-600 flex flex-col w-full items-center pb-8 ">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mt-2 text-lg">No working directory or files available! you can choose a folder to work in.</p>
                        </div>
                    )}
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

