from flask import Flask, request, jsonify
import pandas as pd
from scipy import stats
import json

app = Flask(__name__)

@app.get('/keyword')
def get_by_keyword():
    """
    keyword - keyword to search by (currently searches main category & title (product name))
    amount - top # to return (default 50 probably)
    :return: dataframe with top [amount] entries by predicted category matching the keyword
    """
    keyword = request.args.get('keyword')
    amount = int(request.args.get('amount'))

    df = pd.read_csv('items_megaset_with_categories.csv', index_col=False)
    df.dropna(inplace=True)
    df['main_category'] = df['main_category']
    df['title'] = df['title']

    # scuffed a bit because pandas onelining hates the "in" keyword
    # using -1 as dummy value for false
    ind = [i if (keyword.lower() in df.loc[i]['main_category'].lower()
                 or keyword.lower() in df.loc[i]['title'].lower())
           else -1 for i, r in df.iterrows()]

    # jsonify the dataframe with indices in above
    df = df.loc[[i for i in ind if i != -1]]
    df.sort_values(by='predicted_category')
    return df.head(amount).to_json(orient='records')

@app.get('/stats')
def get_stats_by_id():
    """
    id - id to search specific product for
    :return: dataframe with 1 row with columns sentiment, review_score, and percentile
        sentiment & review score are just pulled from value, percentile is percentile of the
    predicted category value among entries with the same main category
        percentile is liable to have wacky values if the main category has very few values
    """
    id = request.args.get('id')
    df = pd.read_csv('items_megaset_with_categories.csv', index_col=False)

    info = df[df['parent_asin'] == id]
    out = {}
    out['sentiment'] = info['sentiments']
    out['review_score'] = info['average_rating']

    # percentile calculation
    mc = info.iloc[0]['main_category'] # needed so it spits out correct thing
    category_values = df[df['main_category'] == mc]
    percentile = stats.percentileofscore(category_values['predicted_category'], info['predicted_category'])
    out['percentile'] = round(percentile[0], 2) # percentile is a ndarray with 1 value
    return pd.DataFrame(out).to_json(orient='records')
