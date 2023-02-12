import { INode } from '.';
import { ACTIONS } from '../webviews/actions';

export interface RootState {
    search: string;
    rows: INode[];
    activeNode: string | null;
    focussedNode: string | null;
}

export interface IAction {
    type: keyof typeof ACTIONS,
    payload: any
}