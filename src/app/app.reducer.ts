import { ActionReducerMap } from '@ngrx/store';
import * as fromReducers from './shared/ui.reducers';

export interface AppState {
    ui: fromReducers.State; 
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromReducers.uiReducer,
}