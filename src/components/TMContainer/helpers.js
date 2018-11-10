import { getBase64StringFromFile, getCoordinates, getDateTime, getImageMetaData, getImageId } from '../../image-utils'

export const readImageInput = async imageFiles => {
  const images = []
  const promises = Array.from(imageFiles).map(getImageMetaData).map((promise, index) => promise.then(async metaData => {
    const { data: url } = await getBase64StringFromFile(imageFiles[index])
    try {
      const imageObject = {
        position: getCoordinates(metaData),
        timestamp: getDateTime(metaData),
        id: getImageId(metaData),
        width: metaData.ImageWidth,
        height: metaData.ImageHeight,
        url,
      }
      if (imageObject && imageObject.position) {
        images.push(imageObject)
      }
    } catch (error) {
      console.warn(error)
    }
  }).catch(console.warn))

  await Promise.all(promises)
  return images
}
