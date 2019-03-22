import { AsyncStorage } from "react-native";

const PICTURE_LOCATION_STORAGE_KEY = "PictureLocation:Pictures";

export function fetchPictures() {
  return AsyncStorage.getItem(PICTURE_LOCATION_STORAGE_KEY).then(results =>
    results === null ? null : JSON.parse(results)
  );
}
export function savePicture(picture) {
  AsyncStorage.getItem(PICTURE_LOCATION_STORAGE_KEY).then(results => {
    if (results === null) {
      return AsyncStorage.setItem(
        PICTURE_LOCATION_STORAGE_KEY,
        JSON.stringify([picture])
      );
    } else {
      const data = JSON.parse(results);
      data.push(picture);
      AsyncStorage.setItem(PICTURE_LOCATION_STORAGE_KEY, JSON.stringify(data));
    }
  });
}
export function clearAsyncStorage() {
  AsyncStorage.clear();
}
