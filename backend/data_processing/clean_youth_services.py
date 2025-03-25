import pandas as pd

file_path = "../datasets/youth_map.xlsx" 
df = pd.read_excel(file_path, dtype=str)

df.columns = df.columns.str.strip()
column_mapping = {
    "Name of organisation": "provider_name",
    "Lead Contact": "lead_contact",
    "Email Address": "email",
    "Contact Number": "phone_number",
    "Website": "website_social_media",
    "Address of where provision is delivered": "address",
    "Post Code": "postcode",
    "Ward": "areas_of_operation",
    "Age Range": "target_audience",
    "Age 0 - 5": "age_0_5",
    "Age 6 - 11": "age_6_11",
    "Age 12 - 17": "age_12_17",
    "Age 18 +": "age_18_plus",
    "Type of provision": "type_of_provision", 
    "Specialist Provision": "service_description",
    "Head office address": "head_office_address",
    "How are you funded?": "funding_sources",
    "NOTE / COMMENTS": "notes"
}

df.rename(columns=column_mapping, inplace=True)

output_file = "Renamed_Youth_Map.xlsx"
df.to_excel(output_file, index=False)

print(f"Renamed dataset saved as '{output_file}'")
print(df.columns)  






