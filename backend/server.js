const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock Data
const mockData = {
  users: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@uh.edu',
      studentId: '1234567',
      avatar: 'JD',
      location: {
        lat: 29.7205,
        lng: -95.3424,
        lastUpdated: moment().subtract(5, 'minutes').toISOString()
      }
    },
    {
      id: '2',
      name: 'Sarah M.',
      email: 'sarah.m@uh.edu',
      studentId: '2345678',
      avatar: 'SM',
      location: {
        lat: 29.7212,
        lng: -95.3442,
        lastUpdated: moment().subtract(2, 'minutes').toISOString()
      }
    },
    {
      id: '3',
      name: 'Mike R.',
      email: 'mike.r@uh.edu',
      studentId: '3456789',
      avatar: 'MR',
      location: {
        lat: 29.7198,
        lng: -95.3408,
        lastUpdated: moment().subtract(1, 'minute').toISOString()
      }
    },
    {
      id: '4',
      name: 'Security',
      email: 'security@uh.edu',
      studentId: 'SEC001',
      avatar: 'S',
      location: {
        lat: 29.7221,
        lng: -95.3412,
        lastUpdated: moment().subtract(30, 'seconds').toISOString()
      }
    }
  ],

  alerts: [
    {
      id: '1',
      title: 'Suspicious person near East Parking Garage',
      description: 'Campus police are investigating. Avoid the area if possible.',
      severity: 'high',
      type: 'security',
      time: moment().subtract(15, 'minutes').toISOString(),
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
      time: moment().subtract(1, 'hour').toISOString(),
      location: null,
      status: 'active'
    },
    {
      id: '3',
      title: 'Safe Walk Service Extended Hours',
      description: 'Due to high demand, escort service will operate until 3 AM this week.',
      severity: 'low',
      type: 'info',
      time: moment().subtract(3, 'hours').toISOString(),
      location: null,
      status: 'active'
    },
    {
      id: '4',
      title: 'All Clear: Library Area Incident Resolved',
      description: 'Campus police have resolved the earlier reported incident.',
      severity: 'resolved',
      type: 'security',
      time: moment().subtract(5, 'hours').toISOString(),
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
      time: moment().subtract(1, 'day').toISOString(),
      location: {
        lat: 29.7180,
        lng: -95.3380,
        name: 'Stadium Area'
      },
      status: 'active'
    }
  ],

  incidents: [
    {
      id: '1',
      type: 'theft',
      description: 'Bike stolen from rack near library',
      reporter: 'John Doe',
      time: moment().subtract(2, 'hours').toISOString(),
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
      time: moment().subtract(4, 'hours').toISOString(),
      location: {
        lat: 29.7210,
        lng: -95.3420,
        name: 'Student Center'
      },
      status: 'resolved',
      photos: []
    }
  ],

  dangerZones: [
    {
      id: '1',
      name: 'East Parking Garage',
      risk: 'high',
      incidents: 12,
      location: {
        lat: 29.7215,
        lng: -95.3430
      },
      lastIncident: moment().subtract(2, 'days').toISOString()
    },
    {
      id: '2',
      name: 'Science Building Area',
      risk: 'medium',
      incidents: 5,
      location: {
        lat: 29.7190,
        lng: -95.3390
      },
      lastIncident: moment().subtract(1, 'week').toISOString()
    },
    {
      id: '3',
      name: 'Library Back Entrance',
      risk: 'medium',
      incidents: 7,
      location: {
        lat: 29.7200,
        lng: -95.3400
      },
      lastIncident: moment().subtract(3, 'days').toISOString()
    },
    {
      id: '4',
      name: 'Athletic Complex',
      risk: 'low',
      incidents: 2,
      location: {
        lat: 29.7180,
        lng: -95.3380
      },
      lastIncident: moment().subtract(2, 'weeks').toISOString()
    }
  ],

  resources: [
    {
      id: '1',
      name: 'Campus Police',
      phone: '(713) 743-3333',
      available: '24/7',
      type: 'emergency',
      description: 'Emergency response and security services'
    },
    {
      id: '2',
      name: 'Escort Service',
      phone: '(713) 743-3333',
      available: '8 PM - 2 AM',
      type: 'safety',
      description: 'Safe walk escort service'
    },
    {
      id: '3',
      name: 'Counseling Center',
      phone: '(713) 743-5454',
      available: 'Mon-Fri 8am-5pm',
      type: 'support',
      description: 'Mental health and counseling services'
    },
    {
      id: '4',
      name: 'Emergency Shuttle',
      phone: '(713) 743-7433',
      available: 'Mon-Fri 7am-11pm',
      type: 'transport',
      description: 'Emergency transportation service'
    }
  ],

  safeWalks: [
    {
      id: '1',
      userId: '1',
      startTime: moment().subtract(10, 'minutes').toISOString(),
      duration: 15,
      status: 'active',
      startLocation: {
        lat: 29.7205,
        lng: -95.3424,
        name: 'Library'
      },
      endLocation: {
        lat: 29.7210,
        lng: -95.3430,
        name: 'Student Center'
      }
    }
  ]
};

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Users endpoints
app.get('/api/users', (req, res) => {
  res.json(mockData.users);
});

app.get('/api/users/:id', (req, res) => {
  const user = mockData.users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.put('/api/users/:id/location', (req, res) => {
  const { lat, lng } = req.body;
  const user = mockData.users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  user.location = {
    lat,
    lng,
    lastUpdated: new Date().toISOString()
  };
  
  res.json(user);
});

// Alerts endpoints
app.get('/api/alerts', (req, res) => {
  const { severity, status } = req.query;
  let alerts = mockData.alerts;
  
  if (severity) {
    alerts = alerts.filter(alert => alert.severity === severity);
  }
  
  if (status) {
    alerts = alerts.filter(alert => alert.status === status);
  }
  
  // Sort by time (newest first)
  alerts.sort((a, b) => new Date(b.time) - new Date(a.time));
  
  res.json(alerts);
});

app.get('/api/alerts/:id', (req, res) => {
  const alert = mockData.alerts.find(a => a.id === req.params.id);
  if (!alert) {
    return res.status(404).json({ error: 'Alert not found' });
  }
  res.json(alert);
});

// Incidents endpoints
app.get('/api/incidents', (req, res) => {
  res.json(mockData.incidents);
});

app.post('/api/incidents', (req, res) => {
  const { type, description, reporter, location, photos } = req.body;
  
  const newIncident = {
    id: uuidv4(),
    type,
    description,
    reporter,
    time: new Date().toISOString(),
    location,
    status: 'reported',
    photos: photos || []
  };
  
  mockData.incidents.unshift(newIncident);
  
  // Create alert for high-priority incidents
  if (type === 'harassment' || type === 'suspicious') {
    const newAlert = {
      id: uuidv4(),
      title: `New ${type} incident reported`,
      description: description,
      severity: 'high',
      type: 'security',
      time: new Date().toISOString(),
      location,
      status: 'active'
    };
    mockData.alerts.unshift(newAlert);
  }
  
  res.status(201).json(newIncident);
});

// Danger zones endpoints
app.get('/api/danger-zones', (req, res) => {
  const { timeFilter } = req.query;
  let zones = mockData.dangerZones;
  
  if (timeFilter === '30days') {
    const thirtyDaysAgo = moment().subtract(30, 'days').toISOString();
    zones = zones.filter(zone => new Date(zone.lastIncident) > new Date(thirtyDaysAgo));
  }
  
  res.json(zones);
});

// Resources endpoints
app.get('/api/resources', (req, res) => {
  res.json(mockData.resources);
});

// Safe walks endpoints
app.get('/api/safe-walks', (req, res) => {
  const { userId, status } = req.query;
  let walks = mockData.safeWalks;
  
  if (userId) {
    walks = walks.filter(walk => walk.userId === userId);
  }
  
  if (status) {
    walks = walks.filter(walk => walk.status === status);
  }
  
  res.json(walks);
});

app.post('/api/safe-walks', (req, res) => {
  const { userId, duration, startLocation, endLocation } = req.body;
  
  const newSafeWalk = {
    id: uuidv4(),
    userId,
    startTime: new Date().toISOString(),
    duration,
    status: 'active',
    startLocation,
    endLocation
  };
  
  mockData.safeWalks.push(newSafeWalk);
  res.status(201).json(newSafeWalk);
});

app.put('/api/safe-walks/:id/check-in', (req, res) => {
  const walk = mockData.safeWalks.find(w => w.id === req.params.id);
  if (!walk) {
    return res.status(404).json({ error: 'Safe walk not found' });
  }
  
  walk.status = 'completed';
  walk.endTime = new Date().toISOString();
  
  res.json(walk);
});

app.put('/api/safe-walks/:id/cancel', (req, res) => {
  const walk = mockData.safeWalks.find(w => w.id === req.params.id);
  if (!walk) {
    return res.status(404).json({ error: 'Safe walk not found' });
  }
  
  walk.status = 'cancelled';
  walk.endTime = new Date().toISOString();
  
  res.json(walk);
});

// Emergency endpoints
app.post('/api/emergency', (req, res) => {
  const { userId, location, type, description } = req.body;
  
  // Create high-priority alert
  const emergencyAlert = {
    id: uuidv4(),
    title: `EMERGENCY: ${type}`,
    description: description || 'Emergency situation reported',
    severity: 'high',
    type: 'emergency',
    time: new Date().toISOString(),
    location,
    status: 'active'
  };
  
  mockData.alerts.unshift(emergencyAlert);
  
  // Create incident record
  const emergencyIncident = {
    id: uuidv4(),
    type: 'emergency',
    description: description || 'Emergency situation',
    reporter: 'Emergency System',
    time: new Date().toISOString(),
    location,
    status: 'active'
  };
  
  mockData.incidents.unshift(emergencyIncident);
  
  res.status(201).json({
    alert: emergencyAlert,
    incident: emergencyIncident,
    message: 'Emergency reported and authorities notified'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Oasis Campus Safety Backend running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
