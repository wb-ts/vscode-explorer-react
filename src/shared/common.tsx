import React, { useEffect, useRef } from 'react';

interface Props {
    children: React.ReactNode;
}

interface ModalProps extends Props {
    onClose: () => void;
}

interface ButtonProps extends Props {
    onClick: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        //add event listener to container ref
        containerRef.current?.addEventListener('click', handleClick);
        return () => {
            //remove event listener from container ref
            containerRef.current?.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30" ref={containerRef}>
            <div className="relative mt-[10%] mx-auto max-w-lg py-6 bg-white rounded-lg shadow-lg" ref={modalRef}>
                <div className="absolute top-0 right-0 py-2 px-4">
                    <button type="button" className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500" onClick={onClose}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={onClick}
        >
            {children}
        </button>
    );
};
