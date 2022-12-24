import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Item } from '../../types';

interface DraggableItemProps {
    item: Item;
    children: React.ReactNode;
    onMoveItem: (item: Item, targetPath: string) => void;
}


const DraggableItem = ({ item, children, onMoveItem }: DraggableItemProps) => {
    const [{ isDragging }, drag] = useDrag({
        item,
        type: 'item',
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [, drop] = useDrop({
        accept: 'item',
        drop: (draggedItem: Item) => onMoveItem(draggedItem, item.path),
    });

    return (
        <div ref={(node) => drag(drop(node))}>
            {children}
            {isDragging && <div className="absolute inset-0 bg-gray-200 opacity-50 z-10" />}
        </div>
    );
};

export default DraggableItem;
