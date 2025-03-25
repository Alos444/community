import pandas as pd
import json
import os

def convert_excel_to_json(input_file, output_file):
    try:
        df = pd.read_excel(input_file)
        df = df.fillna("")
        
        json_output = df.to_dict(orient="records")

        with open(output_file, "w", encoding="utf-8") as json_file:
            json.dump(json_output, json_file, indent=4, ensure_ascii=False)

        print(f"Conversion successful! JSON saved to: {os.path.abspath(output_file)}")
    
    except Exception as e:
        print(f"❌ Error: {e}")

# Usage example
if __name__ == "__main__":
    input_excel = "../datasets/Final_Geocoded_Dataset.xlsx"  # Update with your file path
    output_json = "Categorized_Geocoded_Dataset.json"  # Name of output file

    convert_excel_to_json(input_excel, output_json)
