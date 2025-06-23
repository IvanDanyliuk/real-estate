import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { Loader } from '../../layout/Loader/Loader';
import 'leaflet/dist/leaflet.css';


type MapCoorsType = { 
  lat: number, 
  lng: number 
};

interface MapInputProps {
  coords: {
    lat: number;
    lng: number;
  };
  onSelectLocation: (coords: MapCoorsType) => void;
};


export const MapInput: React.FC<MapInputProps> = ({ coords, onSelectLocation }) => {
  const [position, setPosition] = useState<MapCoorsType | null>(null);

  const MapEvents = () => {
    useMapEvents({
      click(e: any) {
        const location = e.latlng;
        setPosition(location);
        onSelectLocation(location);
      }
    });
    return null;
  };

  useEffect(() => {
    if(coords) {
      setPosition(coords);
    }
  }, [coords]);
  
  if(position) {
    return (
      <MapContainer
        center={coords}
        zoom={6}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='<a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} />
        <MapEvents />
      </MapContainer>
    );
  } else {
    return (
      <Loader />
    );
  }
};