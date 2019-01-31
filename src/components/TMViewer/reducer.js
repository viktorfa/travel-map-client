import * as actions from './actions'
import { getImagesGroupedByDate } from '../../image-utils'

export const STATE_KEY = 'tmv'

const initialState = {
  images: [],
  groupedImages: {},
  filteredImages: [],
  selectedImage: null,
}

const tmvReducer = (state = initialState, action) => {
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
        selectedGroup: action.payload.group,
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


export default tmvReducer
