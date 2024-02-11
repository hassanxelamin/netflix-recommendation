import pandas as pd

import os

if os.path.isfile('data/dataset.csv'):
    print("File exists")
    data = pd.read_csv('data/dataset.csv')
    print(data.head())
else:
    print("File not found")


