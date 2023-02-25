import { createReducer, on } from '@ngrx/store';

import * as fromActions from './auth.actions';
import { Usuario } from '../models/usuario.model';


export interface State {
	user: Usuario | null;
};

export const initialState: State = {
	user: null,
};

export const authReducer = createReducer(
initialState,
on(fromActions.setUser, (state, { user }) => (
{ ...state, user: {...user} }
)),
on(fromActions.unSetUser, (state) => {
return { ...state, user: null  }
}),
);