import pandas as pd


df = pd.read_excel("../datasets/Food_and_Fuel_Insecurity_Providers_In_Tower_Hamlets.xlsx", dtype=str)

df.columns = df.columns.str.strip().str.replace("\n", " ")

df["Areas of Operation (Wards)"] = df["Areas of Operation (Wards)"].fillna(method='ffill')
df["Eligibility Criteria/Restrictions"] = df["Eligibility Criteria/Restrictions"].fillna("N/A")

df["Contact Information"] = df["Contact Information"].str.replace("tel:", "").str.strip()

df["Capacity (e.g., number of people served per week)"] = df["Capacity (e.g., number of people served per week)"].fillna("Unknown")

df.to_excel("Cleaned_Food_Aid.xlsx", index=False)
print("Cleaned Food Aid data saved to 'Cleaned_Food_Aid.xlsx'")

