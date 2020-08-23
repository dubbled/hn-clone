import HNClient from "../services/hn-client"

const preFetch = 'FETCH'
const preApp = 'APP'

export const types = {
  FETCH_IDS_REQUEST: `${preFetch}/IDS REQUEST`,
  FETCH_IDS_SUCCESS: `${preFetch}/IDS SUCCESS`,
  FETCH_IDS_ERROR: `${preFetch}/IDS ERROR`,
  FETCH_STORIES_REQUEST: `${preFetch}/STORIES REQUEST`,
  FETCH_STORIES_SUCCESS: `${preFetch}/STORIES SUCCESS`,
  FETCH_STORIES_ERROR: `${preFetch}/STORIES ERROR`,

  APP_PAGE_GOTO: `${preApp}/SET PAGE`,
}

const hnClient = new HNClient()

const action = (type, payload) => ({ type, payload })
export const actions = {
  FetchIDs: (payload) => (dispatch) => {
    dispatch(action(types.FETCH_IDS_REQUEST, payload))

    return hnClient.topStories()
      .then(r => {
        payload.storyIDs = r.data.map(v => v.toString())
        dispatch(action(types.FETCH_IDS_SUCCESS, payload.storyIDs))
        dispatch(actions.FetchStories(payload))
      })
      .catch(e => dispatch(
        action(types.FETCH_IDS_ERROR, e)
      ))
  },

  FetchStories: (payload) => (dispatch) => {
    let { pageMax, storyIDs, page } = payload
    if (pageMax === undefined) {
      pageMax = 20
    }
    
    const begin = (page - 1) * pageMax;
    let end = begin + pageMax;
    if (end > storyIDs.length) {
      end = storyIDs.length - 1
    }
    let slice: [] = storyIDs.slice(begin, end)

    dispatch(action(types.FETCH_STORIES_REQUEST, { slice }))

    return Promise.all<any>(slice.map(
      id => hnClient.storyByID(id)))
      .then(stories => {
        dispatch(action(
          types.FETCH_STORIES_SUCCESS,
          {
            stories: stories.map(s => s.data),
            page, pageMax
          }
        ))
      })
      .catch(e => {
        dispatch(action(types.FETCH_STORIES_ERROR, e))
      })
  },

  Navigate: (payload) => (dispatch) => {
    let { page, stories } = payload
    if (stories[page-1].length === 0) {
      dispatch(actions.FetchStories(payload))
    }
    dispatch(action(types.APP_PAGE_GOTO, {page}))
  }
}