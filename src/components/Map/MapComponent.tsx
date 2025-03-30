import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Icon } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { getCrimes, searchCrimes } from '@/data';
import ImportData from '../DataManagement/ImportData';
import ExportData from '../DataManagement/ExportData';

// Define marker icons for different crime types
const crimeIcons = {
  Robbery: new Icon({
    iconUrl: '/icons/robbery.png',
    iconSize: [35, 35], // Increased size
    iconAnchor: [17.5, 35],
    className: 'redicon',
  }),
  Assault: new Icon({
    iconUrl: '/icons/assault.png',
    iconSize: [35, 35],
    iconAnchor: [17.5, 35],
    className: 'redicon',
  }),
  Homicide: new Icon({
    iconUrl: '/icons/homicide.png',
    iconSize: [35, 35],
    iconAnchor: [17.5, 35],
    className: 'redicon',
  }),
  Kidnapping: new Icon({
    iconUrl: '/icons/kidnapping.png',
    iconSize: [35, 35],
    iconAnchor: [17.5, 35],
    className: 'redicon',
  }),
  Theft: new Icon({
    iconUrl: '/icons/theft.png',
    iconSize: [35, 35],
    iconAnchor: [17.5, 35],
    className: 'redicon',
  }),
  Default: new Icon({
    iconUrl: '/icons/default.png',
    iconSize: [35, 35],
    iconAnchor: [17.5, 35],
    className: 'redicon',
  }),
};

// Status color mapping
const statusColors = {
  "Pending": "bg-yellow-100 text-yellow-800",
  "En Route": "bg-blue-100 text-blue-800",
  "On Scene": "bg-purple-100 text-purple-800",
  "Under Investigation": "bg-orange-100 text-orange-800",
  "Resolved": "bg-green-100 text-green-800",
};

const MapComponent = () => {
  const [crimeData, setCrimeData] = useState(getCrimes());
  const [_, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    const newData = searchCrimes(searchTerm);
    setCrimeData(newData);
    setLoading(false);
  }, [searchTerm]);

  // Crime type filter options
  const crimeTypes = ["Assault", "Robbery", "Homicide", "Kidnapping", "Theft"];
  
  // Toggle filter function
  const toggleFilter = (type: string) => {
    if (activeFilters.includes(type)) {
      setActiveFilters(activeFilters.filter(filter => filter !== type));
    } else {
      setActiveFilters([...activeFilters, type]);
    }
  };

  // Get filtered crimes
  const filteredCrimes = activeFilters.length > 0
    ? crimeData.filter(crime => activeFilters.includes(crime.crime_type))
    : crimeData;

  // Handle the report crime button click
  const handleReportCrime = () => {
    navigate('/report');
  };

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Full-screen map with no padding */}
      <MapContainer
        center={[23.58, 58.38]}
        zoom={13}
        style={{ height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <ZoomControl position="bottomright" />

        {filteredCrimes.map(crime => (
          <Marker
            key={crime.id}
            position={[crime.latitude, crime.longitude]}
            icon={crimeIcons[crime.crime_type as keyof typeof crimeIcons] || crimeIcons.Default}
          >
            <Popup>
              <div className="max-w-xs">
                <h3 className="font-bold text-lg">{crime.crime_type}</h3>
                <p className="text-sm mt-1">{crime.report_details}</p>

                <div className="mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[crime.report_status as keyof typeof statusColors] || "bg-gray-100"}`}>
                    {crime.report_status}
                  </span>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  Reported: {crime.report_date_time.replace(/-/g, ' ').replace(/(\d{4}) (\d{2}) (\d{2}) (\d{2}) (\d{2})/, '$1-$2-$3 $4:$5')}
                </div>

                <div className="mt-1 text-xs text-gray-500">
                  Location: {crime.latitude.toFixed(4)}, {crime.longitude.toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Overlay content */}
      <div className="absolute top-0 left-0 w-full z-[1000] flex flex-col items-center">
        {/* Search bar at top center with improved visibility */}
        <div className="w-full max-w-xl mt-4 px-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by type, date, or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 pr-4 rounded-full bg-white/90 backdrop-blur-md shadow-lg border-0 focus:ring-2 focus:ring-primary/50 text-black font-medium"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-3 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter pills with improved visibility */}
        <div className="flex flex-wrap justify-center mt-4 px-4 gap-2">
          {crimeTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className={`
                flex items-center gap-2 py-2 px-4 rounded-full transition-all
                ${activeFilters.includes(type) 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white/90 backdrop-blur-md text-gray-800 shadow border border-gray-200 hover:bg-white/100'
                }
              `}
            >
              <img 
                src={`/icons/${type.toLowerCase()}.png`} 
                alt={type}
                className="w-5 h-5" 
              />
              <span className="font-medium">{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Data controls */}
      <div className="absolute top-4 right-4 z-[1000] flex items-center gap-2">
        <ImportData />
        <ExportData />
      </div>

      {/* Floating Report Crime button */}
      <Button 
        onClick={handleReportCrime}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-6 rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow-lg flex items-center gap-2 text-lg z-[1000]"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Report Crime
      </Button>
    </div>
  );
};

export default MapComponent;
