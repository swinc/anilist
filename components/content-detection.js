import { querySearchMedia, queryUserMediaNotes } from '../lib/query-anilist.js'
import { renderAnilistMatch } from './anilist-match.js'

function composeContentDetection (state) {
  if (!state) {
    console.error('ERROR: no state passed to composeContentDetection()')
    return ''
  } else if (!state.userData || !state.userData.userName) { // no user data
    return ''
  } else if (!state.contentData || !state.contentData.detected) { // user data but no content data
    return `
      <p>No content detected.<p>
      <p>Search Anilist: <input id="search-box" type="text" value=""></p>
    `
  } else {
    return `
      <p>You're watching ${state.contentData.title}.</p>
      <p>Search Anilist: <input id="search-box" type="text" value="${state.contentData.title}"></p>
    `
  }
}

export function renderContentDetection (state) {
  const contentDetectionHtml = composeContentDetection(state)
  document.querySelector('#content-detection').innerHTML = contentDetectionHtml

  const searchBox = document.querySelector('#search-box')
  if (searchBox) {
    searchBox.onkeydown = async function (event) {
      if (event.key === 'Enter') {
        const contentTitle = document.querySelector('#search-box').value
        const mediaData = await querySearchMedia(contentTitle)
        const userName = state.userData.userName
        const userContentData = await queryUserMediaNotes(mediaData.data.Media.id, userName)
        renderAnilistMatch({
          userData: state.userData,
          mediaData: mediaData,
          userContentData: userContentData
        })
      }
    }
  }
}