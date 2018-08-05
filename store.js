import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createActions, handleActions } from 'redux-actions';
import promiseMiddleware from 'redux-promise';

const defaultInitialState = {
  userWallInfos: [],
};

// REDUCERS
export const reducer = handleActions(
  {
    GET_USER_WALL_INFOS: (state, action) => ({
      ...state,
      userWallInfos: action.payload,
    }),

    RESET: (state, action) => ({...defaultInitialState}),
  },
  defaultInitialState
);

export function initializeStore(initialState = defaultInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(promiseMiddleware, thunkMiddleware))
  );
}
