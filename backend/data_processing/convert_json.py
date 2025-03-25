import pandas as pd

input_file = "../datasets/Final_Geocoded_Dataset.xlsx"  
output_file = "Final_Geocoded_Dataset.json"

df = pd.read_excel(input_file, dtype=str)
df.fillna("Not provided", inplace=True)

json_data = df.to_json(orient="records", indent=4)
json_data = json_data.replace("\\/", "/")

with open(output_file, "w", encoding="utf-8") as f:
    f.write(json_data)

print(f"Conversion complete! JSON file saved as: {output_file}")

