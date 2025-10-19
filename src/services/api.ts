// API service for connecting to the Oasis Campus Safety backend
const API_BASE_URL = 'http://localhost:3001/api';

// Generic API request handler
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// Types for API responses
export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  avatar: string;
  location: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low' | 'resolved';
  type: 'security' | 'weather' | 'info' | 'theft' | 'emergency';
  time: string;
  location?: {
    lat: number;
    lng: number;
    name: string;
  };
  status: 'active' | 'resolved';
}

export interface Incident {
  id: string;
  type: string;
  description: string;
  reporter: string;
  time: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  status: string;
  photos: string[];
}

export interface DangerZone {
  id: string;
  name: string;
  risk: 'high' | 'medium' | 'low';
  incidents: number;
  location: {
    lat: number;
    lng: number;
  };
  lastIncident: string;
}

export interface Resource {
  id: string;
  name: string;
  phone: string;
  available: string;
  type: string;
  description: string;
}

export interface SafeWalk {
  id: string;
  userId: string;
  startTime: string;
  duration: number;
  status: 'active' | 'completed' | 'cancelled';
  startLocation: {
    lat: number;
    lng: number;
    name: string;
  };
  endLocation: {
    lat: number;
    lng: number;
    name: string;
  };
}

// API functions
export const api = {
  // Health check
  health: () => apiRequest<{ status: string; timestamp: string }>('/health'),

  // Users
  getUsers: () => apiRequest<User[]>('/users'),
  getUser: (id: string) => apiRequest<User>(`/users/${id}`),
  updateUserLocation: (id: string, lat: number, lng: number) =>
    apiRequest<User>(`/users/${id}/location`, {
      method: 'PUT',
      body: JSON.stringify({ lat, lng }),
    }),

  // Alerts
  getAlerts: (filters?: { severity?: string; status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.severity) params.append('severity', filters.severity);
    if (filters?.status) params.append('status', filters.status);
    const queryString = params.toString();
    return apiRequest<Alert[]>(`/alerts${queryString ? `?${queryString}` : ''}`);
  },
  getAlert: (id: string) => apiRequest<Alert>(`/alerts/${id}`),

  // Incidents
  getIncidents: () => apiRequest<Incident[]>('/incidents'),
  reportIncident: (incident: {
    type: string;
    description: string;
    reporter: string;
    location: { lat: number; lng: number; name: string };
    photos?: string[];
  }) =>
    apiRequest<Incident>('/incidents', {
      method: 'POST',
      body: JSON.stringify(incident),
    }),

  // Danger Zones
  getDangerZones: (timeFilter?: string) => {
    const params = timeFilter ? `?timeFilter=${timeFilter}` : '';
    return apiRequest<DangerZone[]>(`/danger-zones${params}`);
  },

  // Resources
  getResources: () => apiRequest<Resource[]>('/resources'),

  // Safe Walks
  getSafeWalks: (filters?: { userId?: string; status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.userId) params.append('userId', filters.userId);
    if (filters?.status) params.append('status', filters.status);
    const queryString = params.toString();
    return apiRequest<SafeWalk[]>(`/safe-walks${queryString ? `?${queryString}` : ''}`);
  },
  startSafeWalk: (safeWalk: {
    userId: string;
    duration: number;
    startLocation: { lat: number; lng: number; name: string };
    endLocation: { lat: number; lng: number; name: string };
  }) =>
    apiRequest<SafeWalk>('/safe-walks', {
      method: 'POST',
      body: JSON.stringify(safeWalk),
    }),
  checkInSafeWalk: (id: string) =>
    apiRequest<SafeWalk>(`/safe-walks/${id}/check-in`, {
      method: 'PUT',
    }),
  cancelSafeWalk: (id: string) =>
    apiRequest<SafeWalk>(`/safe-walks/${id}/cancel`, {
      method: 'PUT',
    }),

  // Emergency
  reportEmergency: (emergency: {
    userId: string;
    location: { lat: number; lng: number; name: string };
    type: string;
    description?: string;
  }) =>
    apiRequest<{
      alert: Alert;
      incident: Incident;
      message: string;
    }>('/emergency', {
      method: 'POST',
      body: JSON.stringify(emergency),
    }),
};

export default api;
