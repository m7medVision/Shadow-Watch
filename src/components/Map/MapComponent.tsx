import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { getCrimes, searchCrimes } from '@/data';
import { Input } from '../ui/input';
import { Icon } from 'leaflet';

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
  const [searchType, setSearchType] = useState<"id" | "details">("details");
  const [selectedCrimeTypes, setSelectedCrimeTypes] = useState<string[]>(
    [...new Set(crimeData.map(crime => crime.crime_type))]
  );
  useEffect(() => {
    setLoading(true);
    const newData = searchCrimes(searchTerm, searchType);
    setCrimeData(newData);
    setLoading(false);
  }, [searchTerm]);
  return (
    <div className="h-[calc(100vh-4rem)] w-full flex flex-col">
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle>Crime Filter</CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          <div className="mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder={searchType === "id" ? "Search by ID..." : "Search crime details..."}
                aria-label="Search crimes"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className={`text-sm ${searchType === "id" ? "font-medium" : "text-gray-500"}`}>
                Search by details
              </span>
              <Switch
                checked={searchType === "id"}
                onCheckedChange={(checked) => setSearchType(checked ? "id" : "details")}
              />
              <span className={`text-sm ${searchType === "id" ? "font-medium" : "text-gray-500"}`}>
                Search by id
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {[...new Set(crimeData.map(crime => crime.crime_type))].map((type) => (
              <div key={type} className="flex items-center space-x-3 rounded-lg border p-2">
                <label
                  htmlFor={`filter-${type}`}
                  className="text-sm font-medium leading-none"
                >
                  {type}
                </label>
                <Switch
                  id={`filter-${type}`}
                  checked={selectedCrimeTypes.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCrimeTypes([...selectedCrimeTypes, type]);
                    } else {
                      setSelectedCrimeTypes(selectedCrimeTypes.filter(t => t !== type));
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex-grow">
        <MapContainer
          center={[23.58, 58.38]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          <ZoomControl position="bottomright" />

          {crimeData
            .filter(crime => selectedCrimeTypes.includes(crime.crime_type))
            .map(crime => (
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
      </div>
    </div>
  );
};

export default MapComponent;
