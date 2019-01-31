import { readSingleImageFile, fireStoreObjectToImageObject } from './helpers'
import { actions } from '.'
import { actions as viewerActions } from '../TMViewer'
import { storage, firestore } from '../../config/firebase'
import { getImageId } from '../../image-utils'

export const handleImageFileInput = imageFiles => async dispatch => {
  const imagePromises = Array.from(imageFiles)
    .map(readSingleImageFile)
  imagePromises.forEach(async p => {
    dispatch({type: actions.LOAD_IMAGES, payload: {images: [await p]}})
  })
}
export const handleFirebaseStorageInput = (path='user-images/IMG_20181102_165650.jpg') => async dispatch => {
  const ref = storage.ref()
  const fileRef = ref.child(path)
  const url = await fileRef.getDownloadURL()

  dispatch({type: actions.LOAD_IMAGES, payload: {images: [{url, title: path, id: getImageId({})}]} })
}

export const loadFirestoreImages = (limit=10) => async dispatch => {
  const querySnapshot = await firestore.collection('images').limit(10).get()
  querySnapshot.forEach((doc) => {
    console.log('doc')
    console.log(doc)
    console.log(doc.data())
    console.log(doc.id)
    dispatch({
      type: actions.LOAD_IMAGES, 
      payload: {images: [fireStoreObjectToImageObject({...doc.data(), id: doc.id})]},
    })
  })
}

export const loadImagesToMap = () => async (dispatch, getState) => {
  console.log('state')
  console.log(getState())
  dispatch({type: viewerActions.SET_IMAGES, payload: {images: getState().tmc.images.filter(x => x.position && x.timestamp)}})
}
export const resetImages = () => async dispatch => {
  dispatch({type: actions.RESET_IMAGES})
}
export const removeImage = (imageId) => async dispatch => {
  dispatch({type: actions.REMOVE_IMAGE, payload: {imageId}})
}
export const editImage = (newImage) => async dispatch => {
  dispatch({type: actions.EDIT_IMAGE, payload: {newImage}})
}