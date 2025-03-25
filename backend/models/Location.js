const db = require("../database/connect");

class Location {
    static async getAll() {
        const result = await db.query("SELECT * FROM locations");
        return result.rows;
    }

    static async getById(id) {
        const result = await db.query("SELECT * FROM locations WHERE id = $1", [id]);
        return result.rows[0];
    }

    static async create(data) {
        const query = `
            INSERT INTO locations (
                provider_name, service_description, category, address, postcode, latitude, longitude,
                phone_numbers, email, website_social_media, lead_contact, areas_of_operations,
                target_audience, access_type, funding_sources, collaboration_partnerships,
                operating_hours, age_range, min_age, max_age, type_of_provision, notes,
                head_office_address, capacity, has_tra, total_tra
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 
                    $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
            RETURNING *;
        `;
        const values = [
            data.provider_name, data.service_description, data.category, data.address, data.postcode, 
            data.latitude, data.longitude, data.phone_numbers, data.email, data.website_social_media, 
            data.lead_contact, data.areas_of_operations, data.target_audience, data.access_type, 
            data.funding_sources, data.collaboration_partnerships, data.operating_hours, data.age_range, 
            data.min_age, data.max_age, data.type_of_provision, data.notes, data.head_office_address, 
            data.capacity, data.has_tra, data.total_tra
        ];
        const result = await db.query(query, values);
        return result.rows[0];
    }
}

module.exports = Location;
