import config from './config';
import { createActions, handleActions } from 'redux-actions';
import * as api from './lib/pin-api-client';

const actions = createActions({
  GET_USER_WALL_INFOS: api.getUserWallInfos,
  GET_USER_PINS: api.getUserPins,
  RESET: undefined
});

export default actions;
