import { SET_INVESTOR_FILTERS } from './action-types'

const initialState = {
  investor: {
    fundingStage: [],
    giveaway: [],
    productStage: [],
    tokenType: [],
    region: [],
    ticketSize: [],
    industry: []
  }
}

export function filterReducer (state = initialState, action) {
  switch (action.type) {
    case SET_INVESTOR_FILTERS:
      return {
        ...state,
        investor: {
          ...state.investor,
          [action.data.filterType]: action.data.values,
        }
      };
    default:
      return state;
  }
}
