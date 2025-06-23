import { CSSProperties } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { styles } from './styles';
import 'leaflet/dist/leaflet.css';


interface PropertyLocationMap {
  coords: {
    lat: number;
    lng: number;
  };
};


export const PropertyLocationMap: React.FC<PropertyLocationMap> = ({ coords }) => {
  return (
    <MapContainer
      center={coords}
      zoom={6}
      scrollWheelZoom={true}
      style={styles.container as CSSProperties}
    >
      <TileLayer
        attribution='<a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords} />
    </MapContainer>
  );
};