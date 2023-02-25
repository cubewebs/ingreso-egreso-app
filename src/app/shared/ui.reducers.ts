import { createReducer, on } from '@ngrx/store';
import * as fromActions from './ui.actions';

export interface State {
    isLoading: boolean; 
}

export const initialState: State = {
   isLoading: false,
}

const _uiReducer = createReducer(
    initialState,

    on(fromActions.isLoading,   state => ({ ...state, isLoading: true})),
    on(fromActions.stopLoading, state => ({ ...state, isLoading: false})),

);

export function uiReducer(state: any, action: any) {
    return _uiReducer(state, action);
}