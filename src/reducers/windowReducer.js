import * as Actions from '../constants/WindowActions';

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight
};

export default function windowReducer(state = initialState, action) {

  switch (action.type) {

    case Actions.SET_WINDOW_DIMENSIONS:{
      
    	let newState = {...state};
    	newState.width = action.data.windowWidth;
      newState.height = action.data.windowHeight;
      return newState;
    }
    default:
      return state;
  }
}
