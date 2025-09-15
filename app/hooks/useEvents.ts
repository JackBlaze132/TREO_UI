
import { useState, useEffect, useCallback } from 'react';
import API from '../../utils/api/api';

export interface Event {
  id: string;
  name: string;
  location: string;
  date: string;
  image: string;
  latitude: number;
  longitude: number;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await API.get(API.EVENTS);
      if (data && Array.isArray(data.results)) {
          setEvents(data.results);
      } else if (Array.isArray(data)) {
          setEvents(data);
      } else {
          setError(new Error('Unexpected API response structure.'))
      }
    } catch (e) {
      if (e instanceof Error) {
          setError(e);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
};
