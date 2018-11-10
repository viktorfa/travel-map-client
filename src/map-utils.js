export const getGeoCenter = images => {
  const summed = images.reduce((acc, { position }) => {
    return {
      lng: acc.lng + position.lng,
      lat: acc.lat + position.lat,
    }
  }, { lng: 0.0, lat: 0.0 })
  return {
    lat: summed.lat / images.length,
    lng: summed.lng / images.length,
  }
}

export const geo2dec = geo => geo[0] + geo[1] / 60 + geo[2] / 3600


export const getRectangleFromPositions = positions => {
  let maxLat = Math.max(...positions.map(({ lat }) => lat))
  let minLat = Math.min(...positions.map(({ lat }) => lat))
  let maxLng = Math.max(...positions.map(({ lng }) => lng))
  let minLng = Math.min(...positions.map(({ lng }) => lng))
  if (Math.abs(maxLat - minLat) < 0.1) {
    maxLat += 0.1
    minLat -= 0.1
  }
  if (Math.abs(maxLng - minLng) < 0.1) {
    maxLng += 0.1
    minLng -= 0.1
  }
  return {
    north: minLat,
    east: maxLng,
    south: maxLat,
    west: minLng,
  }
}
