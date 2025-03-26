
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SubmitLocation.css";
import axios from "axios";

const categories = [
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

const SubmitLocation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    latitude: "",
    longitude: "",
    description: "",
    contact: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post(`${import.meta.env.VITE_API_URL}/api/submit-location`, formData)

      setSubmitted(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Submission failed. Please try again.");
    }
  };

  if (submitted) {
    return <div className="confirmation">Your submission is pending approval!</div>;
  }

  return (
    <div className="submit-container">
      <h2>Submit a New Location</h2>
      <form onSubmit={handleSubmit} className="submit-form">
        <input
          type="text"
          name="name"
          placeholder="Name of the place"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          required
          value={formData.latitude}
          onChange={handleChange}
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          required
          value={formData.longitude}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <input
          type="text"
          name="contact"
          placeholder="Contact Details (Optional)"
          value={formData.contact}
          onChange={handleChange}
        />

        <button type="submit">Submit for Review</button>
      </form>
    </div>
  );
};

export default SubmitLocation;
