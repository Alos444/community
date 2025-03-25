import pandas as pd
import re


file_path = "../datasets/community_spaces.xlsx"
df = pd.read_excel(file_path, dtype=str)

column_mapping = {
    "Provider_Name": "provider_name",
    "capacity": "capacity",
    "availability": "access_type",
    "cost": "funding_sources",
    "postcode": "postcode",
    "contact": "contact_information",
    "web": "website_social_media",
    "notes": "notes",
    "name": "provider_name", 
    "email": "email",
    "address": "address"
}

df.rename(columns=column_mapping, inplace=True)

df["phone_number"] = df["contact_information"].apply(
    lambda x: re.findall(r'\+?\d[\d\s()-]{8,}', str(x))[0] if re.findall(r'\+?\d[\d\s()-]{8,}', str(x)) else None
)
df["phone_number"] = df["phone_number"].apply(lambda x: re.sub(r"[^\d]", "", str(x)) if x else None)

df["capacity"] = pd.to_numeric(df["capacity"], errors="coerce").astype("Int64")

df["website_social_media"] = df["website_social_media"].apply(lambda x: x if "http" in str(x) else None)#

df["access_type"] = df["access_type"].str.strip().replace({
    "Various on application": "Apply for access", 
    "Contact Office": "Office required",
    "Largely available": "Available",
    "Limited availability": "Limited"
})


output_file = "Final_Cleaned_Community_Spaces.xlsx"
df.to_excel(output_file, index=False)


print(df.head())

print(f"Final cleaned dataset saved as '{output_file}'")




