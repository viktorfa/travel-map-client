import * as actions from './actions'

export const STATE_KEY = 'tmc'


const initialState = {
  images: []
}

const tmcReducer = (state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case actions.LOAD_IMAGES:
      return { ...state,
        images: [...state.images, ...payload.images],
      }
    default:
      return { ...state
      }
  }
}


export default tmcReducer