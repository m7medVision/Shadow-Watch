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
- [x] Create Report Crime Form
  - [x] Design modal/slide-in form UI
  - [x] Implement form with required fields:
    - [x] Report details text input
    - [x] Crime type dropdown (Assault, Robbery, Homicide, Kidnapping)
    - [x] National ID number input with validation
    - [x] Longitude and Latitude fields
  - [x] Add form validation
    - [x] National ID (numbers only)
    - [x] Required fields validation
    - [x] Coordinate format validation
- [x] Form Submission Handling
  - [x] Auto-generate timestamp in required format (YYYY-MM-DD-HH-MM)
  - [x] Set default status to "Pending"
  - [x] Save new crime report to local storage
  - [x] Update map with newly added crime report without reload
- [x] "Report Crime" Button
  - [x] Create button UI that opens the form
  - [x] Implement open/close animation

## Phase 3: Advanced Features (Level 3)
- [x] Interactive Location Selection
  - [x] Implement "Select Crime Location" button
  - [x] Add map click event to drop location pin
  - [x] Auto-fill coordinates in form from pin position
  - [x] Create confirmation UI for location selection
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
