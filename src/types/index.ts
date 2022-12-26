import { v4 as uuidv4 } from 'uuid';

export interface Item {
    id: string; // add an id property
    name: string;
    type: 'folder' | 'file';
    path: string;
    items?: Item[];
    content?: string;
}

export const createItem = (name: string, type: 'folder' | 'file', path: string): Item => {
    return {
        id: uuidv4(), // generate a unique id using uuid library
        name,
        type,
        path,
    };
};