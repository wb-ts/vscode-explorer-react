import { v4 as uuid } from 'uuid';
import { Item, ItemType } from '../types';


export const generateItem = (type: ItemType, name: string, path: string): Item => {
    const item: Item = {
        id: uuid(),
        type,
        name,
        path,
    };

    return item;
};

export const generateItems = (numItems: number, type: ItemType, path: string): Item[] => {
    const items: Item[] = [];

    for (let i = 0; i < numItems; i++) {
        const item = generateItem(type, `${type}-${i + 1}`, path);

        if (type === 'folder') {

            let relativePath = path;
            if (relativePath === '/') {
                relativePath = '';
            }
            item.children = generateItems(numItems, 'file', `${relativePath}/${item.name}`);
        }

        items.push(item);
    }

    return items;
};

export const getParentPath = (path: string): string => {
    const pathParts = path.split('/');
    pathParts.pop();
    return pathParts.join('/');
};

export const getNameFromPath = (path: string): string => {
    const pathParts = path.split('/');
    return pathParts[pathParts.length - 1];
};

export const getTypeFromPath = (path: string): ItemType => {
    const pathParts = path.split('.');
    return pathParts.length > 1 ? 'file' : 'folder';
};