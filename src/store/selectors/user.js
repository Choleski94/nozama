import { createSelector } from 'reselect';

const userSelect = (state) => state.user;

export const selectUser = createSelector([userSelect], (user) => user);

export const isAuthenticated = createSelector([userSelect], (user) => !!user.token);

export const isConfirmed = createSelector([userSelect], (user) => !!user.isConfirmed);
