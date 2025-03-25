import pandas as pd
import re

file_path = "../datasets/Last_Renamed_Youth_Map.xlsx" 
df = pd.read_excel(file_path, sheet_name="Renamed_Youth_Map (updated)")

type_of_provision_data = df["type_of_provision"].dropna()

def extract_clean_info(text):
    if not isinstance(text, str):
        return {}

    extracted_info = {
        "provider_name": "",
        "service_description": "",
        "target_audience": "",
        "age_range": "",
        "activity_type": "",
        "access_type": "",
        "operation_hours": "",
        "contact_email": "",
        "contact_phone": "",
        "website_social_media": "",
        "capacity": "",
        "funding_sources": "",
        "collaboration_partnership": "",
        "notes": "",
        "address": "",
        "postcode": "",
        "areas_of_operation_wards": ""
    }

    provider_match = re.match(r'^([A-Za-z\s&\-,\']+)', text)
    if provider_match:
        extracted_info["provider_name"] = provider_match.group(0).strip()

    age_match = re.findall(r'\b(\d{1,2}-\d{1,2}|\d{1,2}\+)\b', text)
    if age_match:
        extracted_info["age_range"] = ", ".join(age_match)
        extracted_info["target_audience"] = "Youth" if any(int(age.split('-')[0]) < 18 for age in age_match) else "Adults"

    activity_keywords = ["sports", "art", "education", "training", "workshop", "fitness", "music", "drama", "mentoring", "counseling"]
    for keyword in activity_keywords:
        if keyword in text.lower():
            extracted_info["activity_type"] = keyword.capitalize()
            break

    if "free" in text.lower():
        extracted_info["access_type"] = "Free"
    elif "membership" in text.lower():
        extracted_info["access_type"] = "Membership-based"

    time_match = re.findall(r'\b\d{1,2}:\d{2}\s?(AM|PM|am|pm)?\b', text)
    if time_match:
        extracted_info["operation_hours"] = ", ".join(time_match)

    # Extract emails
    email_match = re.findall(r'[\w\.-]+@[\w\.-]+\.\w+', text)
    if email_match:
        extracted_info["contact_email"] = ", ".join(email_match)

    phone_match = re.findall(r'(\+?\d{1,4}[\s-]?\d{2,4}[\s-]?\d{3,4}[\s-]?\d{3,4})', text)
    if phone_match:
        extracted_info["contact_phone"] = ", ".join(phone_match)

    website_match = re.findall(r'(https?://[^\s]+)', text)
    if website_match:
        extracted_info["website_social_media"] = ", ".join(website_match)

    if "grant" in text.lower() or "fund" in text.lower():
        extracted_info["funding_sources"] = "Mentioned"

    cleaned_text = text
    for key, value in extracted_info.items():
        if value:
            cleaned_text = cleaned_text.replace(value, "")

    extracted_info["notes"] = cleaned_text.strip()

    return extracted_info

extracted_data = type_of_provision_data.apply(extract_clean_info).apply(pd.Series)

output_file_path = "cleaned_type_of_provision.xlsx"
extracted_data.to_excel(output_file_path, index=False)

print(f"Structured dataset saved to: {output_file_path}")

