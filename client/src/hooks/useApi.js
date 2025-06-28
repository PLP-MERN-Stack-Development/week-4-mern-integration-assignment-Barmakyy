import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApi(url, method = 'get', body = null, immediate = true) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const execute = async (overrideBody = null) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios({
        url,
        method,
        data: overrideBody !== null ? overrideBody : body,
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate && method === 'get') execute();
    // eslint-disable-next-line
  }, [url]);

  return { data, error, loading, execute, setData };
}
