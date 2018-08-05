import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createActions, handleActions } from 'redux-actions';
import promiseMiddleware from 'redux-promise';
import { List, Map } from 'immutable';

const defaultInitialState = {
  userWallInfos: [],
  currentPins: List(),
};

// REDUCERS
export const reducer = handleActions(
  {
    GET_USER_WALL_INFOS: (state, action) => ({
      ...state,
      userWallInfos: action.payload,
    }),

    GET_USER_PINS: (state, action) => ({
      ...state,
      currentPins: List(action.payload),
    }),

    ADD_LINK: (state, action) => ({
      ...state,
      currentPins: [action.payload].concat(state.currentPins), // TODO: Not efficient but that'd do for now.
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
