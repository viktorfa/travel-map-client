import {actions} from '.'
import { readImageInput } from './helpers'

export const handleImageInput = imageFiles => async dispatch => {
  const images = await readImageInput(imageFiles)
  dispatch(setImages(images))
}
export const setImages = images => ({ type: actions.SET_IMAGES, payload: { images } })
export const handleImageClick = image => ({ type: actions.CLICK_IMAGE, payload: { image } })
export const setFilteredImages = (images, group) => ({ type: actions.SET_FILTERED_IMAGES, payload: { images, group } })
export const setFocusImage = imageId => ({ type: actions.FOCUS_IMAGE, payload: { imageId } })