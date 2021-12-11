import useSWR from 'swr';

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {T | null} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useFetch(apiPath, fetcher) {
  const { data, error } = useSWR(apiPath, fetcher);
  return {
    data,
    error,
    isLoading: !data && !error,
  };
}
