import { useState } from "react";
import MapComponent from "../components/Map.jsx";
import "./MainPage.css";

const categories = [
  "All",
  "Housing & Support Services",
  "Volunteering",
  "Businesses",
  "Arts & Culture",
  "Education & Learning",
  "Events",
  "Fitness & Wellness",
  "Sports & Training",
  "Community Spaces",
  "Youth Services",
  "Legal & Advocacy Services",
  "Food Banks",
  "Childcare",
];

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="main-container">
      {/* Left Sidebar (Filters) */}
      <div className="sidebar">
        <h2>Filters</h2>
        <p>Select a category:</p>
        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-button ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="map-container">
        <MapComponent selectedCategory={selectedCategory} />
      </div>

      {/* Right Sidebar (Additional Info) */}
      <div className="right-sidebar">
        <h2>Additional Info</h2>
        <p>Details about the selected category will appear here.</p>
      </div>
    </div>
  );
};

export default MainPage;