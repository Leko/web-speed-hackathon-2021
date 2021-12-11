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
  const { data, error } = useSWR(process.env.API_HOST + apiPath, fetcher);
  return {
    data: data ?? null,
    error,
    isLoading: !data && !error,
  };
}
