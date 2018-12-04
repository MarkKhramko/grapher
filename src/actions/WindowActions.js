import * as actions from '../constants/WindowActions';

export function setWindowDimensions(data) {
  return { type: actions.SET_WINDOW_DIMENSIONS, data };
}