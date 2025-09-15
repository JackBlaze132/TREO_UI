
import { useState, useEffect, useCallback } from 'react';
import API from '../../utils/api/api';

export interface PublicProfile {
  name: string;
  user: string;
  photo: string;
  level: number;
  experience: number;
  bio: string;
}

export const usePublicProfiles = () => {
  const [profiles, setProfiles] = useState<PublicProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await API.get(API.PUBLIC_PROFILES);
      if (Array.isArray(data)) {
          setProfiles(data);
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
    fetchProfiles();
  }, [fetchProfiles]);

  return { profiles, loading, error, refetch: fetchProfiles };
};
