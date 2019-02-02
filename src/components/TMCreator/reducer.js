import _ from 'lodash'

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
    case actions.EDIT_IMAGE:
      const imageIndex = _.findIndex(state.images, (x) => x.id === payload.image.id)

      return { ...state,
        images: [
          ...state.images.slice(0, imageIndex),
          payload.image,
          ...state.images.slice(imageIndex + 1),
        ],
      }
    default:
      return { ...state
      }
  }
}


export default tmcReducer