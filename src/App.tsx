import { ThemeProvider } from '@/components/theme-provider';
import { StatusCard } from './components/status-card';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import L from 'leaflet';
import type { LatLngTuple } from 'leaflet';
import response from '@/lib/response.json';
import '@/App.css';

const markerPositions = response.traza.map((element: number[]) => {
  const [lng, lat] = element;
  return [lat, lng] as LatLngTuple; // mind the order
});

const customDotIcon = L.divIcon({
  className: 'dot-icon',
  // Set the iconSize and iconAnchor to the dot's size for correct placement
  iconSize: [14, 14], // width + border
  iconAnchor: [7, 7], // half of iconSize to center the dot
});

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="">
        <div className="fixed top-0 left-0 z-50 w-md">
          <StatusCard />
        </div>

        <div className="grid h-screen w-full place-items-center">
          <MapContainer
            center={[-31.4201, -64.1888]}
            zoom={16}
            scrollWheelZoom={false}
            className="z-10 h-full w-full"
            zoomControl={false}
          >
            <ZoomControl position="bottomright" />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {response.paradas.map((parada) => (
              <Marker
                position={[Number(parada.lat), Number(parada.lon)]}
                key={parada.codigo}
                icon={customDotIcon}
              >
                <Popup>{`${parada.parada_nombre}`}</Popup>
              </Marker>
            ))}

            <Polyline
              pathOptions={{ color: response.color, weight: 5, opacity: 0.7 }}
              positions={markerPositions}
            />
          </MapContainer>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
