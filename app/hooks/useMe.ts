
import { useState, useEffect, useCallback } from 'react';
import API from '../../utils/api/api';

export interface Profile {
  id: number;
  user: number;
  photo: string;
  level: number;
  experience: number;
  bio: string;
}

export interface UserAchievement {
  id: number;
  user: number;
  achievement: number;
  date_earned: string;
}

export interface Me {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
  profile: Profile;
  achievements: UserAchievement[];
}

export const useMe = () => {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMe = useCallback(async () => {
    setLoading(true);
    try {
      const data = await API.get(API.ME);
      setMe(data);
    } catch (e) {
      if (e instanceof Error) {
          setError(e);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return { me, loading, error, refetch: fetchMe };
};
