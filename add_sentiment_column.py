"""
items_megaset.csv was read in very poorly, so this will fix it
"""

import pandas as pd
from statistics import mean

df_reviews = pd.read_csv('reviews_megaset.csv')
df_items = pd.read_csv('items_megaset.csv')
df_items = df_items.drop(['images', 'videos', 'details', 'bought_together', 'subtitle', 'author'], axis=1)
with open('sentiment_dict.txt') as f:
    lines = [l.strip() for l in f.readlines()]

is_dict = {} # id_sentiment dict
for l in lines:
    i, sent = l.split(':')[0].strip(), int(l.split(':')[1].strip())
    if i in is_dict:
        is_dict[i].append(sent)
    else:
        is_dict[i] = [sent]

is_dict = {i: float(mean(avg)) for i, avg in is_dict.items()}
sentiments = [is_dict[r['parent_asin']] if r['parent_asin'] in is_dict else float(df_items.iloc[i]['average_rating'] > 3.5) for i, r in df_items.iterrows() ]

df_items['sentiments'] = sentiments
print(df_items.head().to_string())
df_items.to_csv('items_megaset_with_sentiments.csv_cleaned')



