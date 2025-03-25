import pandas as pd
import re

file_path = "../datasets/Renamed_Youth_Map.xlsx"
df = pd.read_excel(file_path, dtype=str)

df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")

def clean_provider_name(name):
    if pd.isna(name):
        return None
    name = name.strip()
    name = re.sub(r"\s+", " ", name)  
    name = name.title() 
    return name

if "provider_name" in df.columns:
    df["provider_name"] = df["provider_name"].apply(clean_provider_name)
else:
    print("Error: 'provider_name' column not found! Columns present:", df.columns)

def extract_email(value):
    if pd.isna(value):
        return None
    emails = re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", value)
    return emails[0] if emails else None 

def clean_lead_contact(contact):
    if pd.isna(contact) or contact.lower() in ["not available", "not known", "-"]:
        return None
    contact = re.sub(r"\s+", " ", contact.strip()) 
    contact = re.sub(r"[<>]", "", contact)  
    contact = re.sub(r"\(.*?\)", "", contact) 
    return contact

if "lead_contact" in df.columns:
    df["lead_contact_email"] = df["lead_contact"].apply(extract_email) 
    df["lead_contact"] = df["lead_contact"].apply(lambda x: clean_lead_contact(x) if x else None)  
else:
    print("Warning: 'lead_contact' column not found.")

def extract_website(value):
    if pd.isna(value):
        return None
    urls = re.findall(r"https?://[^\s]+", value)  
    return urls[0] if urls else None 

if "email" in df.columns:
    df["website_social_media"] = df["email"].apply(extract_website) 
    df["email"] = df["email"].apply(extract_email)  
else:
    print("Warning: 'email' column not found.")

output_file = "Cleaned_Youth_Map.xlsx"
df.to_excel(output_file, index=False)

print(f"Cleaned dataset saved as '{output_file}'")

