# Oasis Campus Safety Backend

A Node.js/Express backend API for the Oasis Campus Safety mobile app, providing mock data and endpoints for all app features.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Or start the production server:**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3001`

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id/location` - Update user location

### Alerts
- `GET /api/alerts` - Get all alerts
  - Query params: `severity`, `status`
- `GET /api/alerts/:id` - Get specific alert

### Incidents
- `GET /api/incidents` - Get all incidents
- `POST /api/incidents` - Report new incident
  - Body: `{ type, description, reporter, location, photos }`

### Danger Zones
- `GET /api/danger-zones` - Get danger zones
  - Query params: `timeFilter` (30days, all)

### Resources
- `GET /api/resources` - Get campus resources

### Safe Walks
- `GET /api/safe-walks` - Get safe walks
  - Query params: `userId`, `status`
- `POST /api/safe-walks` - Start new safe walk
- `PUT /api/safe-walks/:id/check-in` - Check in to safe walk
- `PUT /api/safe-walks/:id/cancel` - Cancel safe walk

### Emergency
- `POST /api/emergency` - Report emergency
  - Body: `{ userId, location, type, description }`

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 3001)

### CORS
The server is configured to accept requests from `http://localhost:3000` (frontend URL).

## 📊 Mock Data

The backend includes comprehensive mock data for:

- **Users**: 4 sample users with locations
- **Alerts**: 5 sample alerts of different severities
- **Incidents**: 2 sample incident reports
- **Danger Zones**: 4 campus areas with risk levels
- **Resources**: 4 campus safety resources
- **Safe Walks**: 1 active safe walk example

## 🔄 Data Flow

1. **Real-time Updates**: User locations are updated via PUT requests
2. **Alert Generation**: New incidents automatically create alerts
3. **Emergency Response**: Emergency reports create high-priority alerts
4. **Safe Walk Tracking**: Timer-based check-ins with automatic completion

## 🛠️ Development

### Adding New Endpoints
1. Add route handler in `server.js`
2. Update mock data if needed
3. Test with frontend integration

### Modifying Mock Data
Edit the `mockData` object in `server.js` to customize:
- User information
- Alert content
- Incident types
- Danger zone locations
- Resource availability

## 🔗 Frontend Integration

Update your frontend API calls to point to:
```javascript
const API_BASE_URL = 'http://localhost:3001/api';
```

Example API call:
```javascript
// Get all alerts
const response = await fetch('http://localhost:3001/api/alerts');
const alerts = await response.json();
```

## 📝 Notes

- All timestamps are in ISO format
- Location data uses latitude/longitude coordinates
- Mock data persists only during server session
- For production, replace with real database integration
