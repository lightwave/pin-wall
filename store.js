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
      currentPins: state.currentPins.unshift(action.payload.pin),
    }),

    DELETE_USER_PIN: (state, action) => {
      console.log(action);
      if (!action.error && !action.payload.error) {
        const id = action.payload.pin._id;
        const index = state.currentPins.findIndex(v => v._id == id);
        if (index >= 0) {
          return {
            ...state,
            currentPins: state.currentPins.delete(index),
          };
        }
      } else {
        // TODO: handle error of delete
        console.error('Error deleting', action.payload);
      }
      return state;
    },

    RESET: (state, action) => ({...defaultInitialState}),
  },
  defaultInitialState
);

export function initializeStore(initialState = defaultInitialState) {
  return createStore(
    reducer,
    // initialState,
    /*
      Immutable.js from SSR redux state does not work. An Immutable.js List will
      be re-hyrdraed as a plain JS array on the client side. This cause incompatible
      type in the downstream code path.

      Need further investigation to find out why.

      For now, force the use of defaultInitialState on the client side.
     */
    defaultInitialState,
    composeWithDevTools(applyMiddleware(promiseMiddleware, thunkMiddleware))
  );
}
