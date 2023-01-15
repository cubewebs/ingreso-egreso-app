import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { State } from './ui.reducers';

export const selectFeature = (state: AppState) => state.ui;

export const selectIsLoading = createSelector(
    selectFeature,
    (state: State) => state.isLoading
  );