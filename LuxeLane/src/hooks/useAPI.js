import { useState, useEffect, useCallback } from 'react';

export const useAPI = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(0);

  const {
    method = 'GET',
    body = null,
    headers = {},
    immediate = true,
    cache = true
  } = options;

  const execute = useCallback(async (customUrl = url, customOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      const requestOptions = {
        method: customOptions.method || method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
          ...customOptions.headers
        },
        ...customOptions
      };

      if (body && method !== 'GET') {
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(customUrl, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, method, body, headers]);

  const refetchData = useCallback(() => {
    setRefetch(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (immediate && url) {
      execute();
    }
  }, [execute, immediate, url, refetch]);

  return {
    data,
    loading,
    error,
    execute,
    refetch: refetchData
  };
};

// Specialized hook for paginated data
export const usePaginatedAPI = (baseUrl, pageSize = 10) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPage = useCallback(async (pageNum = 1, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${baseUrl}?_page=${pageNum}&_limit=${pageSize}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const totalCount = response.headers.get('X-Total-Count');
      const totalPages = Math.ceil(totalCount / pageSize);

      setHasMore(pageNum < totalPages);

      if (append) {
        setAllData(prev => [...prev, ...data]);
      } else {
        setAllData(data);
      }

      return { data, totalPages, totalCount };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [baseUrl, pageSize]);

  const loadNextPage = useCallback(() => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      return fetchPage(nextPage, true);
    }
  }, [hasMore, loading, page, fetchPage]);

  const reset = useCallback(() => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
    setError(null);
  }, []);

  return {
    data: allData,
    loading,
    error,
    hasMore,
    page,
    fetchPage,
    loadNextPage,
    reset,
    setPage
  };
}; 