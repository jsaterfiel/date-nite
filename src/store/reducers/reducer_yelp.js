export default function (state = {}, action) {
  switch (action.type) {
    case 'MARKER_SELECTED':
      return action.payload
    default:
      return state
  }
}
