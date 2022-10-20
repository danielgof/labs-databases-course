import pandas as pd
import time

data  = pd.read_csv('911.csv')

data['timeStamp'] = pd.to_datetime(data['timeStamp'], format="%Y-%m-%d %H:%M:%S")

data = data.drop(['zip', 'desc', 'e', 'addr'], axis=1)
print(data)


