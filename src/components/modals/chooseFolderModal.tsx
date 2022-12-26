import React from 'react';
import { FaFolder } from 'react-icons/fa';

import { Modal, Button } from '../../shared/common';

interface Props {
    path: string;
    onChoose: (path: string, files: FileList) => void;
    onClose: () => void;
}

const ChooseFolderModal: React.FC<Props> = ({ path, onChoose, onClose }) => {
    const handleChoose = () => {
        // implement handleChoose function
    };

    return (
        <Modal onClose={onClose}>
            <div className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="text-lg leading-6 font-medium text-gray-900">
                    Choose a folder
                </div>
                <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                    <p>
                        Select a folder from your local computer to set as the current
                        working directory.
                    </p>
                </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3 flex items-center">
                        <FaFolder className="w-6 h-6 text-gray-400" />
                        <span className="ml-3 text-sm leading-5 text-gray-700">
                            {path}
                        </span>
                    </div>
                </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:py-4">
                <span className="inline-flex rounded-md shadow-sm">
                    <Button onClick={handleChoose}>
                        Choose
                    </Button>
                </span>
            </div>
        </Modal>
    );
};

export default ChooseFolderModal;
