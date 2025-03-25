const fs = require("fs");
const path = require("path");
const db = require("./connect"); 

const jsonFilePath = path.join(__dirname, "../data_processing/Categorized_Geocoded_Dataset.json");
const rawData = fs.readFileSync(jsonFilePath);
const locations = JSON.parse(rawData);

async function insertData() {
    try {
        console.log(`Populating database with ${locations.length} locations...`);

        for (const loc of locations) {
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
                RETURNING id;
            `;
            const values = [
                loc.provider_name || "",
                loc.service_description || "",
                loc.category || "",
                loc.address || "",
                loc.postcode || "",
                loc.latitude || 0,
                loc.longitude || 0,
                loc.phone_numbers || "",
                loc.email || "",
                loc.website_social_media || "",
                loc.lead_contact || "",
                loc.areas_of_operations || "",
                loc.target_audience || "",
                loc.access_type || "",
                loc.funding_sources || "",
                loc.collaboration_partnerships || "",
                loc.operating_hours || "",
                loc.age_range || "",
                loc.min_age || null,
                loc.max_age || null,
                loc.type_of_provision || "",
                loc.notes || "",
                loc.head_office_address || "",
                loc.capacity || "",
                loc.has_tra || "",
                loc.total_tra || ""
            ];
            await db.query(query, values);
        }

        console.log("Database successfully populated!");
    } catch (error) {
        console.error("Error inserting data:", error.message);
    } finally {
        db.end();
    }
}

insertData();
