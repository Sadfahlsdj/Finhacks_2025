from flask import Flask, request, jsonify
import requests
import pandas as pd
from itertools import chain
import re
import json

app = Flask(__name__)

@app.get('/keyword')
def get_by_keyword():
    keyword = request.args.get('keyword').lower()

    df = pd.read_csv('items_megaset_with_sentiments_cleaned.csv', index_col=False)
    df.dropna(inplace=True)
    df['main_category'] = df['main_category'].str.lower()
    df['title'] = df['title'].str.lower()

    # scuffed a bit because pandas onelining hates the "in" keyword
    # using -1 as dummy value for false
    ind = [i if (keyword in df.loc[i]['main_category'] or keyword in df.loc[i]['title'])
           else -1 for i, r in df.iterrows()]

    # jsonify the dataframe with indices in above
    return df.loc[[i for i in ind if i != -1]].to_json(orient='records')