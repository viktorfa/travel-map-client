export const getGeoCenter = images => {
  const summed = images.reduce((acc, {position}) => {
    return {
      lng: acc.lng + position.lng,
      lat: acc.lat + position.lat,
    }
  }, {lng: 0.0, lat: 0.0})
  return {
    lat: summed.lat / images.length,
    lng: summed.lng / images.length,
  }
}

export const geo2dec = geo => geo[0] + geo[1] / 60 + geo[2] / 3600
