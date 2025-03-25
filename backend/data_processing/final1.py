import pandas as pd

file_path = "../datasets/Last_Renamed_Youth_Map.xlsx" 
xls = pd.ExcelFile(file_path)

df = pd.read_excel(xls, sheet_name="Renamed_Youth_Map (updated)")

df.columns = (
    df.columns.str.strip()  
    .str.lower()           
    .str.replace(" ", "_") 
    .str.replace("/", "_") 
    .str.replace("-", "_")  
)
df = df.loc[:, ~df.columns.str.contains("^unnamed")]

df["email"] = df["email"].str.lower()

text_cols_to_clean = [col for col in ["provider_name", "lead_contact", "address", "service_description", "head_office_address"] if col in df.columns]

df[text_cols_to_clean] = df[text_cols_to_clean].apply(lambda x: x.str.strip())

if "phone_numbers" in df.columns:
    df["phone_numbers"] = df["phone_numbers"].astype(str).str.replace(r"\D", "", regex=True)

if "postcode" in df.columns:
    df["postcode"] = df["postcode"].astype(str).str.upper().str.strip()

cleaned_file_path = "Cleaned_Youth_Map_FINAL.xlsx"
df.to_excel(cleaned_file_path, index=False)

print("FINAL CLEANING COMPLETED SUCCESSFULLY!")
print(f"Cleaned file saved as: {cleaned_file_path}")
