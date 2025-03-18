# Shadow Watch Frontend - Project Todo List

## Phase 1: Basic Crime Map & Data Handling (Level 1)
- [ ] Setup project structure
  - [x] Initialize React/Vue/Angular project
  - [x] Set up necessary dependencies for mapping (Leaflet/Google Maps/Mapbox)
  - [x] Create component structure
- [x] Create Map Component
  - [x] Implement basic map functionality
  - [x] Add zoom and navigation controls
- [x] Data Fetching & Display
  - [x] Create data model for crime reports
  - [x] Fetch crime data from JSON file
  - [x] Display crime pins on map based on coordinates
- [x] Crime Details Implementation
  - [x] Create popup component for crime details
  - [x] Show crime info on hover/click (report details, type, date, status)
  - [x] Style crime pins based on type/status
- [x] Filtering System
  - [x] Create filter UI for crime types
  - [x] Implement filter functionality (show/hide specific crime types)
  - [x] Save filter preferences

## Phase 2: Crime Reporting System (Level 2)
- [ ] Create Report Crime Form
  - [ ] Design modal/slide-in form UI
  - [ ] Implement form with required fields:
    - [ ] Report details text input
    - [ ] Crime type dropdown (Assault, Robbery, Homicide, Kidnapping)
    - [ ] National ID number input with validation
    - [ ] Longitude and Latitude fields
  - [ ] Add form validation
    - [ ] National ID (numbers only)
    - [ ] Required fields validation
    - [ ] Coordinate format validation
- [ ] Form Submission Handling
  - [ ] Auto-generate timestamp in required format (YYYY-MM-DD-HH-MM)
  - [ ] Set default status to "Pending"
  - [ ] Save new crime report to local storage
  - [ ] Update map with newly added crime report without reload
- [ ] "Report Crime" Button
  - [ ] Create button UI that opens the form
  - [ ] Implement open/close animation

## Phase 3: Advanced Features (Level 3)
- [ ] Interactive Location Selection
  - [ ] Implement "Select Crime Location" button
  - [ ] Add map click event to drop location pin
  - [ ] Auto-fill coordinates in form from pin position
  - [ ] Create confirmation UI for location selection
- [ ] Search Functionality
  - [ ] Design search bar UI
  - [ ] Implement search by crime type
  - [ ] Implement search by date
  - [ ] Implement search by ID
  - [ ] Show search results on map/list
- [ ] Data Persistence
  - [ ] Set up robust local storage handling
  - [ ] Implement data export/import functionality
  - [ ] Add error handling for data operations

## Phase 4: Bonus Tasks - Production & Mobile Optimization
- [ ] Responsive Design Implementation
  - [ ] Create responsive layout for all screen sizes
  - [ ] Implement mobile-friendly controls
  - [ ] Test on multiple devices
- [ ] Deployment Preparation
  - [ ] Optimize assets and bundle
  - [ ] Set up CI/CD pipeline
  - [ ] Deploy to hosting platform (Vercel, Netlify, etc.)
- [ ] PWA Implementation
  - [ ] Create manifest.json
  - [ ] Implement service worker for offline access
  - [ ] Add install prompt and offline notifications
- [ ] Documentation
  - [ ] Create comprehensive README
  - [ ] Document deployment process
  - [ ] Create user guide or demo video

## Project Enhancement Ideas
- [ ] User authentication system
- [ ] Role-based access (citizen vs. authority)
- [ ] Real-time updates using WebSockets
- [ ] Crime statistics dashboard
- [ ] Heatmap visualization of crime hotspots
- [ ] Notification system for nearby crimes
- [ ] Report verification system
- [ ] Integration with external emergency services API
