import { useState } from "react";
import MapComponent from "../components/Map";
import "./MainPage.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 


const categories = [
  "All", "Housing & Support Services", "Volunteering", "Businesses",
  "Arts & Culture", "Education & Learning", "Events", "Fitness & Wellness",
  "Sports & Training", "Community Spaces", "Youth Services",
  "Legal & Advocacy Services", "Food Banks", "Childcare"
];

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="main-container">
      {/* Header with Navigation */}
      <header className="main-header">
        
        <div className="logo">  <img src={logo} alt="UUN Logo" className="logo-img" /></div>
        <div>COMMUNITY</div>
        <nav>
          <ul>
            <li>Home</li>
            <li>Map</li>
            <li>Resources</li>
            <li>Events</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
        <button className="login-btn">Login / Register</button>
      </header>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map((category, index) => (
          <button
            key={index}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Main Content: Sidebar - Map - Sidebar */}
      <div className="content-wrapper">
        
        {/* Left Sidebar: Filters & Search */}
        <aside className="sidebar-left">
          <h3>Filters</h3>
          <input type="text" placeholder="Search locations..." />
          <p>Additional filter options.</p>
        </aside>

        {/* Interactive Map */}
        <main className="map-container">
          <MapComponent selectedCategory={selectedCategory} />
        </main>

        {/* Right Sidebar: Details & Community */}
        <aside className="sidebar-right">
          <h3>Details</h3>
          <p>Click on a location to see details.</p>
          <h4>Community Insights</h4>
          <ul>
            <li>User Reviews</li>
            <li>Upcoming Events</li>
            <li>Volunteer Opportunities</li>
          </ul>
        </aside>

      </div>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Get Involved!</h2>
        <Link to="/submit-location">
        <button className="cta-btn">Submit a Location</button>
        </Link>

        <button className="cta-btn">Join the Forum</button>
        <button className="cta-btn">Volunteer</button>
      </section>

      {/* Footer */}
      <footer className="main-footer">
       
        <div className="social-icons">
          <span> Facebook</span>
          <span> Instagram</span>
          <span> LinkedIn</span>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;









