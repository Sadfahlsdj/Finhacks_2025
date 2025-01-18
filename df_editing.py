"""
heavy WIP
"""

import pandas as pd

df = pd.read_csv('amazon.csv')
disc_percent = [float(int(d[:-1]) / 100) for d in df['discount_percentage']]
df['discount_percentage'] = disc_percent

df.to_csv('amazon_output.csv', index=False)

print(df.head().to_string())