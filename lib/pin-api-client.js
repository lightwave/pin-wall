import config from '../config';
import qs from 'qs';

export async function getUserWallInfos() {
  const url = config.api_server + `/api/wall`;
  const fetchRes = await fetch(url, { credentials: 'same-origin' });
  const userWallInfo = await fetchRes.json();

  return userWallInfo;
}

export async function getUserPins(userId, pageSize, startCursor) {
  let url = config.api_server + `/api/user/${userId}/pins`;
  const queryStr = qs.stringify({pageSize, startCursor});
  if (queryStr.length > 0) {
    url += '?' + queryStr;
  }
  const fetchRes = await fetch(url, { credentials: 'same-origin' });

  return await fetchRes.json();
}

export async function saveUserPin(sourceUrl, csrfToken) {
  const url = config.api_server + `/api/pin`;

  const formData = { sourceUrl, _csrf: csrfToken };

  // URL encode form
  // Note: This uses a x-www-form-urlencoded rather than sending JSON so that
  // the form also in browsers without JavaScript
  const encodedForm = Object.keys(formData).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
  }).join('&');

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodedForm
  });

  return await res.json();
}

export async function deleteUserPin(pinId, csrfToken) {
  const url = config.api_server + `/api/pin/${pinId}`;

  const formData = {_csrf: csrfToken };

  // URL encode form
  // Note: This uses a x-www-form-urlencoded rather than sending JSON so that
  // the form also in browsers without JavaScript
  const encodedForm = Object.keys(formData).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
  }).join('&');

  const res = await fetch(url, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodedForm
  });

  return await res.json();
}
