import { ActionReducerMap } from '@ngrx/store';
import * as uiReducers from './shared/ui.reducers';
import * as authReducers from './auth/auth.reducers';

export interface AppState {
    ui: uiReducers.State; 
	user: authReducers.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducers.uiReducer,
	user: authReducers.authReducer
}