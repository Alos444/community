
import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({ location, onClose }) => {
  if (!location) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{location.provider_name}</h2>
        {location.service_description && (
          <p><strong>Description:</strong> {location.service_description}</p>
        )}
        {location.type_of_provision && (
          <p><strong>Type of Services:</strong> {location.type_of_provision}</p>
        )}
        {location.target_audience && (
          <p><strong>Target Audience:</strong> {location.target_audience}</p>
        )}
        {location.email && (
          <p><strong>Email:</strong> <a href={`mailto:${location.email}`}>{location.email}</a></p>
        )}
        {location.website_social_media && (
          <p><strong>Website:</strong> <a href={location.website_social_media} target="_blank" rel="noopener noreferrer">
            {location.website_social_media}
          </a></p>
        )}
        {location.phone_numbers && (
          <p><strong>Phone:</strong> {location.phone_numbers}</p>
        )}
      </div>
    </div>
  );
};


Modal.propTypes = {
    location: PropTypes.shape({
      provider_name: PropTypes.string,
      image: PropTypes.string,
      service_description: PropTypes.string,
      type_of_provision: PropTypes.string,
      target_audience: PropTypes.string,
      email: PropTypes.string,
      website_social_media: PropTypes.string,
      phone_numbers: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
  };

export default Modal;


