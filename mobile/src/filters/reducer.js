import { SET_INVESTOR_FILTERS } from './action-types'
import { SET_PROJECT_FILTERS } from './action-types'

const initialState = {
  investor: {
    fundingStage: [],
    giveaway: [],
    productStage: [],
    tokenType: [],
    region: [],
    ticketSize: [],
    industry: []
  },
  project: {
    fundingStage: [],
    giveaway: [],
    productStage: [],
    tokenType: [],
    region: [],
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
    case SET_PROJECT_FILTERS:
      return {
        ...state,
        project: {
          ...state.project,
          [action.data.filterType]: action.data.values,
        }
      };
    default:
      return state;
  }
}
