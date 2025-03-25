import pandas as pd
import re


file_path = "../datasets/final_dataset.xlsx" 
df = pd.read_excel(file_path, dtype=str)

column_mapping = {
    "Provider Name": "provider_name",
    "Type of Provision (Food/Fuel/Both)": "type_of_provision",
    "Service Description": "service_description",
    "Target Audience": "target_audience",
    "Areas of Operation (Wards)": "areas_of_operation",
    "Access type": "access_type",
    "Operating Hours": "operating_hours",
    "Contact Information": "contact_information",
    "Website/Social Media": "website_social_media",
    "Capacity (e.g., number of people served per week)": "capacity",
    "Funding Sources": "funding_sources",
    "Collaborations/Partnerships": "collaborations_partnerships",
    "Notes": "notes",
    "Postcode": "postcode",
    "Address": "address"
}
df.rename(columns=column_mapping, inplace=True)

if "contact_information" in df.columns:
    df["phone_number"] = df["contact_information"].apply(lambda x: re.findall(r'\+?\d[\d\s()-]{8,}', str(x))[0] if re.findall(r'\+?\d[\d\s()-]{8,}', str(x)) else None)
    df["email"] = df["contact_information"].apply(lambda x: re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", str(x))[0] if re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", str(x)) else None)
    df.drop(columns=["contact_information"], inplace=True) 


df["website_social_media"] = df["website_social_media"].apply(lambda x: x if "http" in str(x) else None)


def clean_phone_number(phone):
    phone = re.sub(r"[^\d]", "", str(phone)) 
    return str(phone) if phone.isdigit() else None  

df["phone_number"] = df["phone_number"].apply(clean_phone_number)
df["capacity"] = pd.to_numeric(df["capacity"], errors="coerce").astype("Int64")  

df.replace("Unknown", pd.NA, inplace=True)
df.fillna(pd.NA, inplace=True) 

output_file = "Final_Cleaned_Dataset_Standardized.xlsx"
df.to_excel(output_file, index=False)

print(f"Final structured dataset saved as '{output_file}' with properly formatted phone_number & capacity")
