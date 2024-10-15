// frontend/src/store/spots.js

import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/Get_SPOTS';
const LOAD_SPOT = 'spots/LOAD_SPOT';
//const CREATE_SPOT = 'spots/CREATE_SPOT';
//const UPDATE_SPOT = 'spots/UPDATE_SPOT';
//const DELETE_SPOT = 'spots/DELETE_SPOT';

//Action Creator 

const getAllSpots = (spots) => {
    return {
    type: GET_SPOTS,
    payload: spots
};
};

const loadSpotAction = (spot) => {
    return {
    type: LOAD_SPOT,
    payload: spot
};
};
// const crateSpot = (spot) => {
//     return {
//         type: CREATE_SPOT,
//         payload: spot

//     };
// };

// const updateSpot = (spot) => {
//     return {
//         type: UPDATE_SPOT,
//         payload: spot

//     };
// };

// const deleteSpot = (spotId) => {
//     return {
//         type: DELETE_SPOT,
//         payload: spotId

//     };
// };

// Thunks
// Fetch all spots
export const getSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
      const data = await response.json();
      dispatch(getAllSpots(data.Spots));
    }
  };
  
  // Fetch a single spot (spotdetails) by ID
  export const getSpotByIdThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(loadSpotAction(data));
    }
  };
  // Initial State
  const initialState ={
    allSpots: {},
    singleSpot: {},
  }

  // Reducer

  const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS: {
            const newState = { ...state, allSpots: { ...state.allSpots } };
            action.payload.forEach((spot) => {        //payload
                newState.allSpots[spot.id] = spot;
            });
            return newState;
        }
        case LOAD_SPOT: {
          return {
            ...state,
            allSpots: action.spots,
          };
    }
    default:
        return state;
}
};
export default spotsReducer;