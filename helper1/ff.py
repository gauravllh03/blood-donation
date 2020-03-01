import pandas as pd
from sklearn import svm

import sys 
import math
def normal_round(n):
    if n - math.floor(n) < 0.5:
        return math.floor(n)
    return math.ceil(n)

argumentList = sys.argv
data = [{'Months since Last Donation':int(argumentList[2]),'Number of Donations':int(argumentList[3]),'Total Volume Donated (c.c.)':int(argumentList[4]),'Months since First Donation':int(argumentList[1])}]
df3 = pd.DataFrame(data)  

df3.to_csv('train1.csv', mode='a', header=False)
df= pd.read_csv("train.csv")
df1= pd.read_csv("train1.csv")
#del df1['Arnab']
df1=df1.drop('Arnab',1)
x_train = df.drop(labels='Made Donation in March 2007', axis=1)
x_train1 = df1
y_train=df['Made Donation in March 2007']

decision_tree  = svm.SVR()
decision_tree = decision_tree.fit(x_train,y_train)

 
print(decision_tree.predict(df3))
data3=[{'res':normal_round(decision_tree.predict(df3)[0])}]
df4=pd.DataFrame(data3)
df4.to_csv("res.csv", sep=',') 
