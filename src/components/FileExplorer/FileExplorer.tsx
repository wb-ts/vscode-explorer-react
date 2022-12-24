import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import fs from 'fs';
import path from 'path';
import { Item } from '../../types';
import DraggableItem from '../DraggableItem/DraggableItem';

// types

interface FileExplorerProps { }

const FileExplorer: React.FC<FileExplorerProps> = () => {
    const [currentPath, setCurrentPath] = useState<string>('');
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        // Read the contents of the current directory when the component mounts
        // or when the current path changes
        const readDirectory = async (dirPath: string) => {
            const items = await fs.promises.readdir(dirPath);
            setItems(items.map((item) => ({ id: uuid(), name: item, path: path.join(dirPath, item) })));
        };
        readDirectory(currentPath);
    }, [currentPath]);

    const handleCreateFolder = () => {
        // Show a prompt to enter the name of the new folder
        const folderName = window.prompt('Enter the name of the new folder:');
        if (!folderName) return;

        // Use the fs module to create the new folder
        fs.mkdir(path.join(currentPath, folderName), (error) => {
            if (error) {
                console.error(error);
                return;
            }
            // Update the list of items to include the new folder
            setItems([...items, { id: uuid(), name: folderName, path: path.join(currentPath, folderName) }]);
        });
    };

    const handleCreateFile = () => {
        // Show a prompt to enter the name of the new file
        const fileName = window.prompt('Enter the name of the new file:');
        if (!fileName) return;

        // Use the fs module to create the new file
        fs.writeFile(path.join(currentPath, fileName), '', (error) => {
            if (error) {
                console.error(error);
                return;
            }
            // Update the list of items to include the new file
            setItems([...items, { id: uuid(), name: fileName, path: path.join(currentPath, fileName) }]);
        });
    };

    const handleSelectFolder = (item: Item) => {
        // Update the current path to the selected folder
        setCurrentPath(item.path);
    };

    const handleMoveItem = (item: Item, targetPath: string) => {
        // Use the fs module to move the item to the target path
        fs.rename(item.path, targetPath, (error) => {
            if (error) {
                console.error(error);
                return;
            }
            // Update the list of items to reflect the moved item
            setItems(
                items.map((i) => {
                    if (i.id === item.id) {
                        return { ...i, path: targetPath };
                    }
                    return i;
                }),
            );
        });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col h-screen">
                <div className="px-4 py-2 bg-gray-400 flex justify-between">
                    <button className="btn btn-blue" onClick={handleCreateFolder}>
                        Create folder
                    </button>
                    <button className="btn btn-blue" onClick={handleCreateFile}>
                        Create file
                    </button>
                </div>
                <div className="px-4 py-2 overflow-y-auto">
                    <ul className="list-none">
                        {items.map((item) => (
                            <DraggableItem key={item.id} item={item}
                                onMoveItem={handleMoveItem}>
                                <li key={item.id} className="px-2 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleSelectFolder(item)}>
                                    {/* Display a folder icon for directories and a file icon for files */}
                                    {item.name}
                                </li>
                            </DraggableItem>
                        ))}
                    </ul>
                </div>
            </div>
        </DndProvider>
    );
};

export default FileExplorer;