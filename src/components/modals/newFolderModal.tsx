import React, { useState } from 'react';
import { FaFolder } from 'react-icons/fa';

import { Modal, Button } from '../../shared/common';

interface Props {
    onCreate: (name: string) => void;
    onClose: () => void;
}

const NewFolderModal: React.FC<Props> = ({ onCreate, onClose}) => {
    const [name, setName] = useState('');

    const handleCreate = () => {
        if (name) {
            onCreate(name);
            setName('');
        }
    };

    return (
        <Modal onClose={onClose}>
            <div className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="text-lg leading-6 font-medium text-gray-900">
                    Create a new folder
                </div>
                <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                    <p>Enter a name for the new folder:</p>
                </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3 flex items-center">
                        <FaFolder className="w-6 h-6 text-gray-400" />
                        <input
                            className="form-input ml-3 block w-full leading-5 rounded text-gray-700 transition duration-150 ease-in-out outline-none py-1 px-2 focus:border-blue-600 border border-gray-600 sm:text-sm sm:leading-5"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:py-4">
                <span className="inline-flex rounded-md shadow-sm">
                    <Button onClick={handleCreate}>
                        Create
                    </Button>
                </span>
            </div>
        </Modal>
    );
};

export default NewFolderModal;
