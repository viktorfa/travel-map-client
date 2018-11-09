import moment from 'moment'
import exif from 'exif-js'
import _ from 'lodash'
import Compressor from 'compressorjs'

import { geo2dec } from './map-utils'

export const getBase64StringFromFile = async file => {
  const compressedImage = await compressImage(file)
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = event => {
      const imageDataUrl = event.target.result
      resolve({ ok: true, data: imageDataUrl })
    }
    fileReader.readAsDataURL(compressedImage)
  })
}

export const compressImage = imageFile => {
  return new Promise((resolve, reject) => {
    new Compressor(imageFile, {
      maxHeight: 1024,
      success: resolve,
      error: reject,
    })
  })
}

export const getDateTimeFromExifTime = timestamp => moment(timestamp.replace(/:/g, ''))

export const getImageMetaData = (imageElement) => {
  return new Promise((resolve, reject) => {
    exif.getData(imageElement, function () {
      try {
        const metadata = exif.getAllTags(this)
        resolve(metadata)
      } catch (error) {
        console.warn(error)
        reject(error)
      }
    })
  })
}


export const getCoordinates = (metadata) => {
  try {
    return {
      lng: geo2dec(metadata.GPSLongitude),
      lat: geo2dec(metadata.GPSLatitude),
    }
  } catch (error) {
    return null
  }
}

let counter = 0
const getNonce = () => ++counter

export const getImageId = metadata => {
  if (metadata.ImageUniqueID) return metadata.ImageUniqueID
  else return getNonce().toString()
}

export const getDateTime = metadata => {
  if (metadata.DateTime) return getDateTimeFromExifTime(metadata.DateTime)
  else if (metadata.DateTimeOriginal) return getDateTimeFromExifTime(metadata.DateTimeOriginal)
  else return null
}

export const getImagesGroupedByDate = images => _.groupBy(images, image => image.timestamp.format('DD MMM YYYY'))
