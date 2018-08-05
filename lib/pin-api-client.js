import config from '../config';

export async function getUserWallInfos() {
  const url = config.api_server + `/api/wall`;
  const fetchRes = await fetch(url, { credentials: 'same-origin' });
  const userWallInfo = await fetchRes.json();
  return userWallInfo;
}

