DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS users;

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,        
    provider_name TEXT NOT NULL,            
    service_description TEXT,   
    category TEXT,                  
    address TEXT,               
    postcode TEXT,               
    latitude DECIMAL(9,6),          
    longitude DECIMAL(9,6),    
    phone_numbers TEXT,        
    email TEXT,                  
    website_social_media TEXT,    
    lead_contact TEXT,           
    areas_of_operations TEXT,       
    target_audience TEXT,         
    access_type TEXT,            
    funding_sources TEXT,       
    collaboration_partnerships TEXT,
    operating_hours TEXT,           
    age_range TEXT,
    min_age INT,
    max_age INT,
    type_of_provision TEXT,
    notes TEXT,
    head_office_address TEXT,
    capacity TEXT,
    has_tra TEXT,
    total_tra TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_provider_name ON locations(provider_name);
CREATE INDEX idx_category ON locations(category);
CREATE INDEX idx_postcode ON locations(postcode);
CREATE INDEX idx_areas_of_operations ON locations(areas_of_operations);

