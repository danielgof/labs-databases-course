"""1,2"""
import pandas as pd

usa_dol=pd.read_excel('usa_dol.xlsx')
canad_dol=pd.read_excel('canad_dol.xlsx')
eur=pd.read_excel('eur.xlsx')

usa_dol=usa_dol.drop(['cdx','nominal'],axis=1)
canad_dol=canad_dol.drop(['cdx','nominal'],axis=1)
eur=eur.drop(['cdx','nominal'],axis=1)

usa_dol.rename(columns={"curs":"USD"}, inplace=True)
canad_dol.rename(columns={"curs":"CAD"}, inplace=True)
eur.rename(columns={"curs":"EUR"}, inplace=True)

df=usa_dol.merge(canad_dol,on=['data'])
df=df.merge(eur,on=['data'])
df


"""3"""
import statsmodels.api as sm
import matplotlib.pyplot as plt
from sklearn.preprocessing import minmax_scale


usd_plot=sm.ProbPlot(df['USD'])
usd_plot.ppplot(line='45')
usd_plot.qqplot(line='45')
plt.show()