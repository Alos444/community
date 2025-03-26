import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import PropTypes from "prop-types";
import Modal from "./Modal";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

// ✅ Use marker icons from public folder (to fix missing markers on Render)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const API_URL = `${import.meta.env.VITE_API_URL}/api/locations`;

const userIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const MapComponent = ({ selectedCategory }) => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  useEffect(() => {
    if (!selectedCategory || selectedCategory === "All") {
      setFilteredLocations(locations);
    } else {
      const filtered = locations.filter((loc) =>
        loc.category && loc.category.split(", ").includes(selectedCategory)
      );
      setFilteredLocations(filtered);
    }
  }, [selectedCategory, locations]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Geolocation error:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleMoreInfoClick = (loc, event) => {
    event.stopPropagation();
    setSelectedLocation(loc);
    if (activePopup) {
      activePopup._closeButton.click();
    }
  };

  return (
    <div className="map-container">
      <MapContainer
        center={userLocation ? [userLocation.lat, userLocation.lng] : [51.5074, -0.1278]}
        zoom={12}
        className="leaflet-map"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <strong>You are here</strong>
            </Popup>
          </Marker>
        )}

        {filteredLocations.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.latitude, loc.longitude]}
            eventHandlers={{
              click: (e) => {
                setActivePopup(e.target._popup);
              },
            }}
          >
            <Popup>
              <strong>{loc.provider_name}</strong>
              <br />
              <button onClick={(e) => handleMoreInfoClick(loc, e)}>More Info</button>
              <br />
              {userLocation && (
                <a
                  href={`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${userLocation.lat}%2C${userLocation.lng}%3B${loc.latitude}%2C${loc.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedLocation && <Modal location={selectedLocation} onClose={() => setSelectedLocation(null)} />}
    </div>
  );
};

MapComponent.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default MapComponent;

