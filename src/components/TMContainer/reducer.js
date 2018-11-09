import moment from 'moment';

import { exampleState } from '../../assets/example-state'
import * as actions from './actions'
import { getImagesGroupedByDate } from '../../image-utils'

export const STATE_KEY = 'tm'

const defaultImages = exampleState[STATE_KEY].images.map(image => ({ ...image, timestamp: moment(image.timestamp) }))

const initialState = {
  images: defaultImages,
  groupedImages: getImagesGroupedByDate(defaultImages),
  filteredImages: [],
  selectedImage: null,
}

const tmReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_IMAGES:
      return {
        ...state,
        images: action.payload.images,
        groupedImages: getImagesGroupedByDate(action.payload.images),
        filteredImages: [],
      }
    case actions.SET_FILTERED_IMAGES:
      return {
        ...state,
        filteredImages: action.payload.images,
      }
    case actions.FOCUS_IMAGE:
      return {
        ...state,
        focusedImage: action.payload.imageId,
      }
    case actions.CLICK_IMAGE:
      return {
        ...state,
        selectedImage: state.selectedImage === action.payload.image ? null : action.payload.image,
      }
    default:
      return { ...state }
  }
}


export default tmReducer
