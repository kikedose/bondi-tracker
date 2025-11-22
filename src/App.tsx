import { ThemeProvider } from '@/components/theme-provider';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from 'react-leaflet';
import L from 'leaflet';
import type { LatLngTuple } from 'leaflet';
import response from '@/lib/response.json';
import '@/App.css';

const positions = response.traza.map((element: number[]) => {
  const [lng, lat] = element;
  return [lat, lng] as LatLngTuple; // mind the order
});

const customDotIcon = L.divIcon({
  className: 'dot-icon',
  // You must set the iconSize and iconAnchor to the dot's size for correct placement
  iconSize: [14, 14], // width + border
  iconAnchor: [7, 7], // half of iconSize to center the dot
});

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="grid h-screen w-full place-items-center">
        <MapContainer
          center={[-31.4201, -64.1888]}
          zoom={16}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {response.paradas.map((parada) => (
            <Marker
              position={[parada.lat, parada.lon]}
              key={parada.codigo}
              icon={customDotIcon}
            >
              <Popup>{`${parada.parada_nombre}`}</Popup>
            </Marker>
          ))}

          <Polyline
            pathOptions={{ color: response.color, weight: 5, opacity: 0.7 }}
            positions={positions}
          />
        </MapContainer>
      </main>
    </ThemeProvider>
  );
}

export default App;
