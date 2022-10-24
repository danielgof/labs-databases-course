from numpy import sort
import pandas as pd


data  = pd.read_csv('../data/911.csv')
"""1."""
data['timeStamp'] = pd.to_datetime(data['timeStamp'], format="%Y-%m-%d %H:%M:%S")
data.rename(columns={"lng":"ing", "timeStamp":"accident_time", "twp":"town", "addr":"address"}, inplace=True)
# print("before")
# print(data)
"""2."""
data = data.drop(['zip', 'desc', 'e', 'address'], axis=1)
# print("after")
# print(data)
"""3."""
sort_data = data.sort_values(by=['town', 'lat', 'ing', 'accident_time', 'title'], ascending=False)
# print("after sorting")
# print(sort_data)
"""4."""
new_df = sort_data.town.value_counts(ascending=True)
print(new_df)
# print([i for i in sorted(list(new_df))])
# print([sort_data[i].value_counts() for i in sort_data.town.unique()])