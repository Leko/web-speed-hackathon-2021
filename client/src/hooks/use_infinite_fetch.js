import React from 'react';

const LIMIT = 15;

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {Array<T>} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 * @property {() => Promise<void>} fetchMore
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T[]>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useInfiniteFetch(apiPath, fetcher) {
  const internalRef = React.useRef({ isLoading: false, offset: 0 });

  const [result, setResult] = React.useState({
    data: [],
    error: null,
    isLoading: true,
  });

  const fetchMore = React.useCallback(() => {
    const { isLoading, offset } = internalRef.current;
    if (isLoading) {
      return;
    }

    setResult((cur) => ({
      ...cur,
      isLoading: true,
    }));
    internalRef.current = {
      isLoading: true,
      offset,
    };

    const params = new URLSearchParams();
    params.set('limit', LIMIT);
    params.set('offset', offset);
    const promise = fetcher(apiPath + '?' + params.toString());

    promise.then((allData) => {
      setResult((cur) => ({
        ...cur,
        data: [...cur.data, ...allData.slice(offset, offset + LIMIT)],
        isLoading: false,
      }));
      internalRef.current = {
        isLoading: false,
        offset: offset + LIMIT,
      };
    });

    promise.catch((error) => {
      setResult((cur) => ({
        ...cur,
        error,
        isLoading: false,
      }));
      internalRef.current = {
        isLoading: false,
        offset,
      };
    });
  }, [apiPath, fetcher]);

  React.useEffect(() => {
    setResult(() => ({
      data: [],
      error: null,
      isLoading: true,
    }));
    internalRef.current = {
      isLoading: false,
      offset: 0,
    };

    fetchMore();
  }, [fetchMore]);

  return {
    ...result,
    fetchMore,
  };
}
