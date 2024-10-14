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

const loadSpot = (spot) => {
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
export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
      const spots = await response.json();
      dispatch(getAllSpots(spots));
    }
  };
  
  // Fetch a single spot (spotdetails) by ID
  export const getSpotById = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
      const spot = await response.json();
      dispatch(loadSpot(spot));
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
            action.spots.forEach((spot) => {        //payload
                newState.allSpots[spot.id] = spot;
            });
            return newState;
        }
        case LOAD_SPOT: {
        return { ...state, singleSpot: action.spot };
    }
    default:
        return state;
}
};
export default spotsReducer;