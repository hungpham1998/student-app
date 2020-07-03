import {FETCH_LEARNCLASS} from '../../config/actionTypes'; 
const learnclassState = [];

  export const learnclass = (state = learnclassState, action) => {
    switch (action.type) {
        case FETCH_LEARNCLASS:
            state = action.learnclass;
            // state.data = action.learnclass.rows;
        return {
          ...state,
        };
  
      default:
        return state;
    }
  };
