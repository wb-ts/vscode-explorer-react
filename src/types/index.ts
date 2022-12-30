import { v4 as uuidv4 } from 'uuid';

export interface Item {
    id: string; // add an id property
    name: string;
    type: 'folder' | 'file';
    parent: string;
    children?: Item[];
}

export type ItemType = 'folder' | 'file';
