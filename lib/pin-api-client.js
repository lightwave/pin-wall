import config from '../config';

export async function getUserWallInfos() {
  const url = config.api_server + `/api/wall`;
  const fetchRes = await fetch(url, { credentials: 'same-origin' });
  const userWallInfo = await fetchRes.json();
  return userWallInfo;
}

export async function getUserPins(userId) {
  const url = config.api_server + `/api/user/${userId}/pins`;
  const fetchRes = await fetch(url, { credentials: 'same-origin' });
  const pins = await fetchRes.json();
  console.log('pins', pins);
  return pins;
}
