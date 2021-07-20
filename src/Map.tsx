import React, { useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import styled from 'styled-components';

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justigy-content: space-between;
  align-items: center;
  flex-direction: column-reverse;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 10px;
`;

const Map: React.FC = () => {
  const map = useRef<L.Map | null>(null);

  React.useEffect(() => {
    if (!map.current) map.current = initMap();
  }, []);

  const initMap = (
    startPoint: L.LatLngTuple = [37.497998539956285, 127.02751936366657],
  ): L.Map => {
    const mapOptions: L.MapOptions = {
      center: startPoint,
      zoom: 16,
      zoomControl: false,
    };
    const tileLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const map = L.map('map', mapOptions);
    L.tileLayer(tileLayer).addTo(map);
    map.pm.addControls({
      position: 'topright',
      drawMarker: true,
      drawRectangle: true,
      drawCircle: true,
      drawCircleMarker: true,
      drawPolyline: true,
      cutPolygon: true,
    });

    L.Icon.Default.imagePath = './';
    L.Icon.Default.prototype.options.iconUrl = 'marker.png';
    L.Icon.Default.prototype.options.shadowSize = [41, 41];

    L.control
      .zoom({
        position: 'topright',
      })
      .addTo(map);

    return map;
  };

  return (
    <Container>
      <MapWrapper id="map" />
    </Container>
  );
};

export default Map;
