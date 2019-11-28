import C from '../constants/actions';

export default function filteredPairs(state = [], action) {
  switch (action.type) {
    case C.SET_PAIRS:
      return action.payload;
    case C.UPDATE_PAIR:
      return state.map(pair =>
        pair.id === action.payload.id ? { ...pair, ...action.payload } : pair,
      );

    case C.UPDATE_PAIRS:
      return state.map(pair => {
        const updatedPair = action.payload.find(item => item.id === pair.id);
        if (updatedPair && updatedPair.id) return { ...pair, ...updatedPair };
        return pair;
      });
    case C.SET_FILTERED_PAIRS:
      return action.payload;
    default:
      return state;
  }
}
