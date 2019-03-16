
export const RECIEVE_PICTURES = 'RECIEVE_PICTURES'
export const ADD_PICTURE = 'ADD_PICTURE'


export function receivePictures(pictures) {
  return {
    type: RECIEVE_PICTURES,
    pictures,
  }
}
export function addPicture(picture) {
  return {
    type: ADD_PICTURE,
    picture,
  }
}
