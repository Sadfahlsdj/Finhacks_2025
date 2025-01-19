import pandas as pd

dfs = []
dfs.append(pd.read_json('meta_All_Beauty.jsonl', lines=True))
dfs.append(pd.read_json('meta_Appliances.jsonl', lines=True))
dfs.append(pd.read_json('meta_Digital_Music.jsonl', lines=True))
dfs.append(pd.read_json('meta_Health_and_Personal_Care.jsonl', lines=True))
dfs.append(pd.read_json('meta_Software.jsonl', lines=True))

df_out = pd.concat(dfs)
print(df_out.head().to_string())
df_out.to_csv('items_megaset_full.csv')