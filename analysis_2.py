"""
heavy WIP
"""

import pandas as pd

df = pd.read_csv('amazon.csv')
print(df.groupby('product_id')['rating'].mean())