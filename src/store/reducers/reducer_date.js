export default function (state = {count: 2}, action) {
  switch (action.type) {
    case 'DATE_SELECTED':
      return action.payload
    default:
      return state
  }
}
