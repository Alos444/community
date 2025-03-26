import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import PropTypes from "prop-types";
import Modal from "./Modal";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

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
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const RADIUS_KM = 5;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);
  console.log("Nearby locations:", nearbyLocations);


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

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });

        const nearby = locations.filter((loc) =>
          calculateDistance(userLat, userLng, loc.latitude, loc.longitude) <= RADIUS_KM
        );
        setNearbyLocations(nearby);
      },
      (error) => console.error("Geolocation error:", error),
      { enableHighAccuracy: true }
    );
  }, [locations]);

  const handleMoreInfoClick = (loc, event) => {
    event.stopPropagation();
    setSelectedLocation(loc);
  };

  const locationsToShow = filteredLocations.filter((loc) =>
    userLocation
      ? calculateDistance(userLocation.lat, userLocation.lng, loc.latitude, loc.longitude) <= RADIUS_KM
      : true
  );

  return (
    <div className="map-container">
      <MapContainer center={[51.5074, -0.1278]} zoom={12} className="leaflet-map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <strong>You are here</strong>
            </Popup>
          </Marker>
        )}

        {locationsToShow.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.latitude, loc.longitude]}
            eventHandlers={{
              click: () => setSelectedLocation(loc),
            }}
          >
            <Popup>
              <strong>{loc.provider_name}</strong>
              <br />
              <button onClick={(e) => handleMoreInfoClick(loc, e)}>More Info</button>
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
