import { types } from '../actions'

interface IAppState {
  page: number
}
  
const defaultAppState: IAppState = {
  page: 1
}
  
export default (state = defaultAppState, action) => {
  switch (action.type) {
    case types.APP_PAGE_GOTO:
      const { page } = action.payload
      return { ...state, page }
    default:
      return state
  }
}
  