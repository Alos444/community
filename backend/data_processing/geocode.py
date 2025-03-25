import pandas as pd
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import time

df = pd.read_excel("../datasets/Cleaned_Better_Categorized_Dataset.xlsx")
geolocator = Nominatim(user_agent="uun_geocoder")

def get_lat_lng(row):
    query = row["postcode"] if pd.notna(row["postcode"]) else row["address"]
    if query:
        for attempt in range(3):
            try:
                print(f"Geocoding: {query}") 
                location = geolocator.geocode(query, timeout=10)
                if location:
                    return pd.Series([location.latitude, location.longitude])
            except GeocoderTimedOut:
                print("Timeout, retrying...")
                time.sleep(2) 
    return pd.Series(["", ""])

df[["latitude", "longitude"]] = df.apply(get_lat_lng, axis=1)
df.to_excel("Geocoded_Dataset.xlsx", index=False)
print("Geocoding complete! Check 'Geocoded_Dataset.xlsx'")

