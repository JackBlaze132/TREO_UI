
import AsyncStorage from '@react-native-async-storage/async-storage';

class API {
  private readonly API_BASE_URL: string = 'https://treo-backend.up.railway.app/';

  public readonly HEADER_TEST: string = 'hello/header';

  // Endpoints
  public readonly PUBLIC_PROFILES: string = 'api/users/public-profiles/';
  public readonly EVENTS: string = 'api/location/events/';
  public readonly ROUTES: string = "api/location/routes/";
  public readonly WAYPOINT: string = "api/location/waypoints/";
  public readonly ACHIEVEMENTS: string = "api/users/achievements/";
  public readonly ME: string = "api/users/me/";
  public readonly REGISTER: string = "api/users/register/";
  public readonly USER_ACHIEVEMENT: string = "api/users/user-achievements/";
  public readonly LOGIN: string = "api/token/";

  private static instance: API;

  private constructor() {}

  public static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }
    return API.instance;
  }

  private async getAccessToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('accessToken');
    } catch (e) {
      console.error('Error getting access token from storage', e);
      return null;
    }
  }

  private async setAuthTokens(accessToken: string, refreshToken: string): Promise<void> {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
    } catch (e) {
      console.error('Error setting auth tokens in storage', e);
    }
  }

  public async get(endpoint: string, headers: Record<string, string> = {}): Promise<any> {
    const token = await this.getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(this.API_BASE_URL + endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  public async post(endpoint: string, data: any, headers: Record<string, string> = {}) {
    const token = await this.getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(this.API_BASE_URL + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      throw error;
    }
  }

    public async login(credentials: any): Promise<void> {
        try {
            const response = await this.post(this.LOGIN, credentials);
            const { access, refresh } = response;
            if (access && refresh) {
                await this.setAuthTokens(access, refresh);
            } else {
                throw new Error('Access or Refresh token not received.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

  public async put(endpoint: string, data: any, headers: Record<string, string> = {}) {
    const token = await this.getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(this.API_BASE_URL + endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      console.error(`Error patching to ${endpoint}:`, error);
      throw error;
    }
  }

  public async delete(endpoint: string, headers: Record<string, string> = {}) {
    const token = await this.getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(this.API_BASE_URL + endpoint, {
        method: 'DELETE',
        headers: {
          ...headers,
        },
      });
      if (response.ok && response.status === 204) {
        return {}; // or return null
      }
      return response.json();
    } catch (error) {
      console.error(`Error deleting to ${endpoint}:`, error);
      throw error;
    }
  }
}

export default API.getInstance();
