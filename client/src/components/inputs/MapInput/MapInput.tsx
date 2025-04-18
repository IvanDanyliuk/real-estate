import { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import 'leaflet-defaulticon-compatibility';
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'; 


type MapCoorsType = { 
  lat: number, 
  lng: number 
};

interface LocationPointProps {
  onSelectLocation: (coords: MapCoorsType) => void;
}

interface MapInputProps extends LocationPointProps {
  center: {
    lat: number;
    lng: number;
  };
};

const LocationPoint: React.FC<LocationPointProps> = ({ onSelectLocation }) => {
  const [position, setPosition] = useState<MapCoorsType | null>(null);

  useMapEvents({
    click(e: any) {
      const location = e.latlng;
      setPosition(location);
      onSelectLocation(location);
    }
  });

  return position 
    ? <Marker position={position} /> 
    : null;
};

export const MapInput: React.FC<MapInputProps> = ({ center, onSelectLocation }) => {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={6}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        // attribution='<a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationPoint onSelectLocation={onSelectLocation} />
    </MapContainer>
  );
};