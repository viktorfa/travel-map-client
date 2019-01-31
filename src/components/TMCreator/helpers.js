import _ from 'lodash'
import firebase from 'firebase'
import moment from 'moment'

import {storage, firestore} from '../../config/firebase'
import { getBase64StringFromFile, getCoordinates, getDateTime, getImageMetaData, getImageId } from '../../image-utils'

export const readImageInput = async imageFiles => {
  const images = []
  const promises = Array.from(imageFiles).map(getImageMetaData).map((promise, index) => promise.then(async metaData => {
    const { data: url } = await getBase64StringFromFile(imageFiles[index])
    try {
      const firebaseImage = await uploadFileToCloud(imageFiles[index])
      const firebaseImageUrl = await firebaseImage.ref.getDownloadURL()
      console.log(firebaseImage)
      console.log(firebaseImageUrl) 
      const imageObject = {
        position: getCoordinates(metaData),
        timestamp: getDateTime(metaData),
        id: getImageId(metaData),
        width: metaData.ImageWidth,
        height: metaData.ImageHeight,
        url,
      }
      if (imageObject) {
        images.push(imageObject)
      }
    } catch (error) {
      console.warn(error)
    }
  }).catch(console.warn))

  await Promise.all(promises)
  return images
}

export const imageObjectToFirestoreObject = imageObject => {
  const timestamp = (imageObject.timestamp && imageObject.timestamp.toDate()) || new Date(imageObject.lastModified)
  const position = (imageObject.position && new firebase.firestore.GeoPoint(imageObject.position.lat, imageObject.position.lng)) || null
  return {
    ..._.omit(imageObject, ['id']), 
    timestamp,
    position,
  }
}
export const fireStoreObjectToImageObject = firestoreObject => {
  const position = (firestoreObject.position && {lat: firestoreObject.position.latitude, lng: firestoreObject.position.longitude}) || null
  return {
    ...firestoreObject,
    position,
    timestamp: moment(firestoreObject.timestamp.toDate()),
  }
}

export const readSingleImageFile = async imageFile => {
  const [imageMetaData, firebaseImage]  = await Promise.all([getImageMetaData(imageFile), await uploadFileToCloud(imageFile)])
  const firebaseImageUrl = await firebaseImage.ref.getDownloadURL()

  const imageObject = {
    position: getCoordinates(imageMetaData),
    timestamp: getDateTime(imageMetaData),
    id: getImageId(imageMetaData),
    width: imageMetaData.ImageWidth,
    height: imageMetaData.ImageHeight,
    url: firebaseImageUrl,
    title: imageFile.name,
    lastModified: imageFile.lastModified,
  }

  const firestoreRef = await firestore.collection('images').add(imageObjectToFirestoreObject(imageObject))
  console.log('firestoreRef')
  console.log(firestoreRef)


  return imageObject
}


const uploadFileToCloud = async (file, folder='user-images') => {
  const ref = storage.ref()
  const folderRef = ref.child(folder)
  const fileRef = folderRef.child(file.name)
  console.log('file')
  console.log(file)
  return fileRef.put(file)
}