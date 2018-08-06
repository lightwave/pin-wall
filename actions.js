import config from './config';
import { createActions, handleActions } from 'redux-actions';
import * as api from './lib/pin-api-client';

const actions = createActions({
  GET_USER_WALL_INFOS: api.getUserWallInfos,
  GET_USER_PINS: api.getUserPins,
  ADD_LINK: api.saveUserPin,
  SAVE_USER_PIN: api.saveUserPin,
  DELETE_USER_PIN: api.deleteUserPin,
  RESET: undefined
});

export default actions;
