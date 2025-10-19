import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

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
  status: 'reported' | 'investigating' | 'resolved';
  photos: string[];
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

interface IncidentContextType {
  incidents: Incident[];
  alerts: Alert[];
  recentActivities: (Incident | Alert)[];
  addIncident: (incident: Omit<Incident, 'id' | 'time' | 'status'>) => void;
  updateIncidentStatus: (id: string, status: Incident['status']) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'time' | 'status'>) => void;
  resolveAlert: (id: string) => void;
  getRecentActivities: (limit?: number) => (Incident | Alert)[];
  getAlerts: (limit?: number) => Alert[];
  clearAllData: () => void;
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const useIncidents = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default data for first-time users
  const defaultIncidents: Incident[] = [
    {
      id: '1',
      type: 'theft',
      description: 'Bike stolen from rack near library',
      reporter: 'John Doe',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      location: {
        lat: 29.7200,
        lng: -95.3400,
        name: 'Library'
      },
      status: 'investigating',
      photos: []
    },
    {
      id: '2',
      type: 'harassment',
      description: 'Verbal harassment reported near student center',
      reporter: 'Sarah M.',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      location: {
        lat: 29.7210,
        lng: -95.3420,
        name: 'Student Center'
      },
      status: 'resolved',
      photos: []
    }
  ];

  const defaultAlerts: Alert[] = [
    {
      id: '1',
      title: 'Suspicious person near East Parking Garage',
      description: 'Campus police are investigating. Avoid the area if possible.',
      severity: 'high',
      type: 'security',
      time: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
      location: {
        lat: 29.7215,
        lng: -95.3430,
        name: 'East Parking Garage'
      },
      status: 'active'
    },
    {
      id: '2',
      title: 'Weather Alert: Heavy Rain Expected',
      description: 'Thunderstorms expected this evening. Plan your commute accordingly.',
      severity: 'medium',
      type: 'weather',
      time: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
      status: 'active'
    },
    {
      id: '3',
      title: 'Safe Walk Service Extended Hours',
      description: 'Due to high demand, escort service will operate until 3 AM this week.',
      severity: 'low',
      type: 'info',
      time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      status: 'active'
    },
    {
      id: '4',
      title: 'All Clear: Library Area Incident Resolved',
      description: 'Campus police have resolved the earlier reported incident.',
      severity: 'resolved',
      type: 'security',
      time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      location: {
        lat: 29.7200,
        lng: -95.3400,
        name: 'Library Area'
      },
      status: 'resolved'
    },
    {
      id: '5',
      title: 'Bike Theft Reported in Stadium Area',
      description: 'Multiple bike thefts reported. Use designated bike racks and locks.',
      severity: 'medium',
      type: 'theft',
      time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      location: {
        lat: 29.7180,
        lng: -95.3380,
        name: 'Stadium Area'
      },
      status: 'active'
    }
  ];

  // Load data from localStorage or use defaults
  const [incidents, setIncidents] = useState<Incident[]>(() => {
    try {
      const saved = localStorage.getItem('oasis-incidents');
      return saved ? JSON.parse(saved) : defaultIncidents;
    } catch {
      return defaultIncidents;
    }
  });

  const [alerts, setAlerts] = useState<Alert[]>(() => {
    try {
      const saved = localStorage.getItem('oasis-alerts');
      return saved ? JSON.parse(saved) : defaultAlerts;
    } catch {
      return defaultAlerts;
    }
  });

  // Save to localStorage whenever incidents or alerts change
  useEffect(() => {
    localStorage.setItem('oasis-incidents', JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem('oasis-alerts', JSON.stringify(alerts));
  }, [alerts]);

  const addIncident = useCallback((incidentData: Omit<Incident, 'id' | 'time' | 'status'>) => {
    const newIncident: Incident = {
      ...incidentData,
      id: Date.now().toString(),
      time: new Date().toISOString(),
      status: 'reported'
    };

    setIncidents(prev => [newIncident, ...prev]);

    // Only create alerts for emergency incidents that need immediate attention
    if (incidentData.type === 'emergency') {
      const newAlert: Alert = {
        id: `alert-${Date.now()}`,
        title: `Emergency incident reported`,
        description: `Emergency situation reported at ${incidentData.location.name}`,
        severity: 'high',
        type: 'emergency',
        time: new Date().toISOString(),
        location: incidentData.location,
        status: 'active'
      };
      
      setAlerts(prev => [newAlert, ...prev]);
      toast.success(`Emergency incident reported and alert created`);
    } else {
      toast.success('Incident reported successfully!');
    }
  }, []);

  const updateIncidentStatus = useCallback((id: string, status: Incident['status']) => {
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === id ? { ...incident, status } : incident
      )
    );
    toast.success(`Incident status updated to ${status}`);
  }, []);

  const addAlert = useCallback((alertData: Omit<Alert, 'id' | 'time' | 'status'>) => {
    const newAlert: Alert = {
      ...alertData,
      id: Date.now().toString(),
      time: new Date().toISOString(),
      status: 'active'
    };

    setAlerts(prev => [newAlert, ...prev]);
    toast.success('New alert created');
  }, []);

  const resolveAlert = useCallback((id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, status: 'resolved' as const } : alert
      )
    );
    toast.success('Alert resolved');
  }, []);

  const getRecentActivities = useCallback((limit = 10) => {
    const allActivities = [
      ...incidents.map(incident => ({ ...incident, activityType: 'incident' as const })),
      ...alerts.map(alert => ({ ...alert, activityType: 'alert' as const }))
    ];
    
    return allActivities
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, limit);
  }, [incidents, alerts]);

  const getAlerts = useCallback((limit = 10) => {
    return alerts
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, limit);
  }, [alerts]);

  const clearAllData = useCallback(() => {
    setIncidents(defaultIncidents);
    setAlerts(defaultAlerts);
    localStorage.removeItem('oasis-incidents');
    localStorage.removeItem('oasis-alerts');
    toast.success('All data cleared and reset to defaults');
  }, []);

  const recentActivities = getRecentActivities(10);

  const value: IncidentContextType = {
    incidents,
    alerts,
    recentActivities,
    addIncident,
    updateIncidentStatus,
    addAlert,
    resolveAlert,
    getRecentActivities,
    getAlerts,
    clearAllData
  };

  return (
    <IncidentContext.Provider value={value}>
      {children}
    </IncidentContext.Provider>
  );
};
