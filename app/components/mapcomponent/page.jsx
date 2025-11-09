'use client';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { FiNavigation } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const schoolLocation = [-1.246601, 37.345945];

// Nearby landmarks coordinates (approximate)
const nearbyLandmarks = [
  { position: [-1.247, 37.344], name: "Kambusu Shopping Center", type: "commercial" },
  { position: [-1.245, 37.347], name: "Local Primary School", type: "education" },
  { position: [-1.248, 37.346], name: "Community Health Center", type: "health" },
  { position: [-1.244, 37.343], name: "Kangundo Road Junction", type: "transport" }
];

export default function MapComponent() {
  return (
    <div className="h-96 rounded-2xl overflow-hidden border border-gray-600">
      <MapContainer
        center={schoolLocation}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* School location marker */}
        <Marker position={schoolLocation}>
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-gray-800 text-lg">Katwanyaa High School</h3>
              <p className="text-sm text-gray-600 mb-2">Kambusu, Tala, Machakos County</p>
              <div className="space-y-1 text-xs text-gray-500">
                <p>📍 Main Campus Location</p>
                <p>🏫 Secondary School</p>
                <p>🎓 Forms 1-4</p>
              </div>
              <a 
                href="https://maps.google.com/?q=-1.246601,37.345945"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1 mt-2"
              >
                <FiNavigation className="text-xs" />
                Get Directions on Google Maps
              </a>
            </div>
          </Popup>
        </Marker>

        {/* School area circle */}
        <Circle
          center={schoolLocation}
          radius={200}
          pathOptions={{
            fillColor: 'blue',
            fillOpacity: 0.1,
            color: 'blue',
            opacity: 0.3,
            weight: 2
          }}
        />

        {/* Nearby landmarks */}
        {nearbyLandmarks.map((landmark, index) => (
          <Marker key={index} position={landmark.position}>
            <Popup>
              <div className="p-2">
                <h4 className="font-semibold text-gray-800">{landmark.name}</h4>
                <p className="text-xs text-gray-500 capitalize">{landmark.type}</p>
                <p className="text-xs text-gray-600 mt-1">Near Katwanyaa High School</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}