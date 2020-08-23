import { types } from '../actions'

interface IDataState {
  isLoading: boolean
  storyIDs: string[]
  stories: [][]
  pageMax: number
}

const defaultDataState: IDataState = {
  isLoading: false,
  storyIDs: [],
  stories: [],
  pageMax: 20,
}

export default (state = defaultDataState, action) => {
switch (action.type) {
  case types.FETCH_IDS_REQUEST:
    return { ...state, isLoading: true }
  case types.FETCH_IDS_SUCCESS:
    return {
      ...state,
      storyIDs: action.payload
    }
  case types.FETCH_STORIES_REQUEST:
    return { ...state, isLoading: true }
  case types.FETCH_STORIES_SUCCESS:
    const { page, stories } = action.payload
    const { storyIDs, pageMax } = state
    const cache = state.stories
    
    let pageCount = Math.floor(storyIDs.length / pageMax)
    if (storyIDs.length % pageMax !== 0) pageCount++

    if (cache.length < pageCount) {
        for (let i = 0; i < pageCount; i++) {
        cache[i] = []
        }
    }
    cache[page-1] = stories

    return {
        ...state,
        isLoading: false,
        stories: cache,
    }
  default:
    return state
  }
}