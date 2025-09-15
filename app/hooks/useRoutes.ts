
import { useState, useEffect } from 'react';
import API from '../../utils/api/api';

export interface Waypoint {
    id: number;
    route: number;
    name: string;
    latitude: number;
    longitude: number;
    order: number;
}

export interface Route {
    id: number;
    name: string;
    type: string;
    icon: string;
    color: string;
    reward: number;
    waypoints: Waypoint[];
}

export const useRoutes = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await API.get(API.ROUTES);
        if (Array.isArray(data)) {
            setRoutes(data);
        }
      } catch (e) {
        if (e instanceof Error) {
            setError(e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  return { routes, loading, error };
};
