import pandas as pd
from datasets import load_dataset

partials_review = []
partials_item = []

with open('dataset_categories.txt') as f:
    lines = [l.strip() for l in f.readlines()]

for l in lines:
    dataset_review = load_dataset("McAuley-Lab/Amazon-Reviews-2023", "raw_review_All_Beauty", split="full",
                           trust_remote_code=True)
    dataset_item = load_dataset("McAuley-Lab/Amazon-Reviews-2023", "raw_meta_All_Beauty", trust_remote_code=True)

    partials_review.append(pd.DataFrame.from_dict(dataset_review)
                           .sample(frac=0.002).reset_index(drop=True))
    partials_item.append(pd.DataFrame.from_dict(dataset_item)
                           .sample(frac=0.002).reset_index(drop=True))

    print(f'category {l} done')

df_review = pd.concat(partials_review)
df_item = pd.concat(partials_item)

print(df_review.head().to_string())
print(df_item.head().to_string())

df_review.to_csv('reviews_megaset.csv')
df_item.to_csv('items_megaset.csv')
