import { ThemeProvider } from '@/components/theme-provider';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import response from '@/lib/response.json';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="grid h-screen w-full place-items-center">
        <MapContainer
          center={[-31.4201, -64.1888]}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {response.paradas.map((parada) => (
            <Marker position={[parada.lat, parada.lon]} key={parada.codigo}>
              <Popup>{`${parada.parada_nombre}`}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </main>
    </ThemeProvider>
  );
}

export default App;
