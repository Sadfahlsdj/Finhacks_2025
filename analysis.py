"""
Quick & dirty NLTK sentiment analyzer trained on the review scores of products on the dataset
"""

import pandas as pd
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk.probability import FreqDist
from nltk.classify import NaiveBayesClassifier
import nltk.classify.util
from itertools import chain

stop_words = set(stopwords.words('english'))
def remove_stopwords(tokens):
    return [word for word in tokens if word.lower() not in stop_words]

def document_features(document, word_features):
    document_words = set(document)
    features = {}
    for word in word_features:
        features['contains({})'.format(word)] = (word in document_words)
    return features

df = pd.read_csv('amazon.csv')
df.drop(['about_product', 'img_link'], axis=1, inplace=True)
halfway_len = int(len(df) / 2)

tokens = [remove_stopwords(word_tokenize(t)) for t in df['review_content']]
tokens = [[t for t in to if t.isalpha()] for to in tokens] # remove punctuation

stemmer = PorterStemmer()
lemmatizer = WordNetLemmatizer()

stemmed_tokens = [[stemmer.stem(w) for w in word] for word in tokens]
lemmatized_tokens = [[lemmatizer.lemmatize(w) for w in word] for word in tokens]

all_words = [word.lower() for review in df['review_content'] for word in word_tokenize(review)]
all_words_freq = FreqDist(chain.from_iterable(tokens))

labels = ['Positive' if float(r) > 3.5 else 'Negative' for r in df['rating']]

# can limit to top 2k for testing ([:2000])
word_features = list(all_words_freq.keys())

feature_sets = [(document_features(word_tokenize(t), word_features), label)
                for (t, label) in zip(df['review_content'], labels)]
train_set, test_set = feature_sets[halfway_len:], feature_sets[:halfway_len]

classifier = NaiveBayesClassifier.train(train_set)
accuracy = nltk.classify.util.accuracy(classifier, test_set)
print(f'Accuracy: {accuracy * 100:.2f}%')

classifier.show_most_informative_features(50)
