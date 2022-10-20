# https://www.kaggle.com/gustavomodelli/forest-fires-in-brazil

import numpy as np
import pandas as pd

pd.set_option('display.max_columns', 2000)
pd.set_option('display.width', 2000)

table = pd.read_csv("amazon.csv", sep = ",",
                    parse_dates = ['date'],
                    encoding = 'ANSI')
# print(table)
# print(table.dtypes)

table.sort_values(by = ['date', 'state'], inplace = True)

# print(table)

table.sort_values(by = ['date', 'state'], inplace = True,
                  ascending = [True, False])

# print(table)

table2 = table[table['year'] > 1999]

# print(table2)

table3 = table2.loc[[19, 39, 59]]

# print(table3)

table3 = table2.iloc[[0, -1]]

# print(table3)

table3 = table2[['state', 'date']]

# print(table3)

lst = ['Tocantins', 'Alagoas']

table3 = table2.query('state in(@lst)')

# print(table3)

ftr = pd.DataFrame([[2017, 'Tocantins'], [2017, 'Alagoas'],
                 [2016, 'Tocantins'], [2016, 'Alagoas']],
                   columns = ['year', 'state'])
# print(ftr)

table3 = table2.merge(ftr, on = ['year', 'state'])

# print(table3)

table2.at[6217, 'number'] = None

# print(table2)

table4 = table2[table2['number'].notnull()]

# print(table4)

table4 = table2.dropna()

# print(table4)

table5 = table2.copy()
table5.columns = ['acc_year', 'acc_state', 'm', 'size', 'acc_date']

# print(table5)

table5.rename(columns = {'acc_year': 'year'}, inplace = True)
table5.rename_axis('id', inplace = True)

# print(table5)

table5.reset_index(inplace = True)

freq = table5['year'].value_counts(ascending = False).rename_axis('year').reset_index(name = 'freq')
freq2 = table5.groupby('year').count()

# print(table5)


# print(table5.describe())

# print(table5.mean())

print(table5.quantile(q = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]))
