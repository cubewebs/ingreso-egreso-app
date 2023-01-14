import { createAction } from '@ngrx/store';

export const isLoading = createAction('[UI component] is loading');
export const stopLoading = createAction('[UI component] stop loading');