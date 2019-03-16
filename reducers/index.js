import { RECIEVE_PICTURES, ADD_PICTURE } from "../actions"

export default function pictures(state = [], action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case RECIEVE_PICTURES:
      return newState.concat(action.pictures);
    case ADD_PICTURE:
      return newState.concat(action.picture);
    default:
      return state;
  }
}
