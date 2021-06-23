import { User } from '../types/user-types'

export function userIsLoggedIn(userData: User | null): boolean {
  if (Number.isInteger(userData?.id) && typeof userData?.name === 'string') {
    return true
  } else {
    return false
  }
}

export function mediaTitleIsDetected(mediaTitle: any): boolean {
  if (typeof mediaTitle === 'string' && mediaTitle.length > 0) {
    return true;
  } else {
    return false;
  }
}

export function mediaSearchDataIsAvailable(mediaData: any) {
  if (
    typeof mediaData?.data?.Media?.coverImage?.medium === 'string' &&
    mediaData?.data?.Media?.coverImage?.medium.length > 0 &&
    Number.isInteger(mediaData?.data?.Media?.id) &&
    typeof mediaData?.data?.Media?.title?.english === 'string' &&
    mediaData?.data?.Media?.title?.english.length > 0
  ) {
    return true
  } else {
    return false
  }
}

export function userMediaNotesAreAvailable(userMediaListData: any) {
  if (
    Number.isInteger(userMediaListData?.data?.MediaList?.progress) &&
    Number.isInteger(userMediaListData?.data?.MediaList?.score)
  ) {
    return true
  } else {
    return false
  }
}
