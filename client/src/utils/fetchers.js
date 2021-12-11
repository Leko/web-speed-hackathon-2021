/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  return fetch(url).then((res) => res.json());
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  return fetch(url, {
    method: 'post',
    body: file,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  }).then((res) => res.json());
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}

export { fetchJSON, sendFile, sendJSON };
