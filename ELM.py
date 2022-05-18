import pandas as pd
import sklearn
import numpy as np
from sklearn.model_selection import train_test_split

class ELM:  
	
	def __init__(self, inputSize, outputSize, hiddenSize):
  

		self.inputSize = inputSize
		self.outputSize = outputSize
		self.hiddenSize = hiddenSize       
		
		self.weight = np.matrix(np.random.uniform(-0.5, 0.5, (self.hiddenSize, self.inputSize)))

		self.bias = np.matrix(np.random.uniform(0, 1, (1, self.hiddenSize)))
		
		self.H = 0
		self.beta = 0

	def sigmoid(self, x):

		return 1 / (1 + np.exp(-1 * x))

	def predict(self, X):
		X = np.matrix(X)
		y = self.sigmoid((X * self.weight.T) + self.bias) * self.beta
		print(y)
		return "Not phishing" if (y[0][0] < 0) else "Probably phishing"

	def train(self):
		X = np.matrix(self.X_train)
		y = np.matrix(self.y_train).reshape(-1,1) 
		# Calculate hidden layer output matrix (Hinit)
		self.H = (X * self.weight.T) + self.bias

		self.H = self.sigmoid(self.H)
      
		H_moore_penrose = np.linalg.inv(self.H.T * self.H) * self.H.T

		self.beta = H_moore_penrose * y

		return self.H * self.beta

	def prep(self):
		df=pd.read_csv('data.csv')
		df.drop('SSLfinal_State',axis='columns', inplace=True)
		df.drop('Abnormal_URL',
		axis='columns', inplace=True)
		df.drop('Redirect',
		axis='columns', inplace=True)
		df.drop('RightClick',
		axis='columns', inplace=True)
		df.drop('popUpWidnow',
		axis='columns', inplace=True)
		df.drop('port',
		axis='columns', inplace=True)
		df.drop('id',
		axis='columns', inplace=True)
		df.drop('DNSRecord',
		axis='columns', inplace=True)
		df.drop('web_traffic',
		axis='columns', inplace=True)
		df.drop('Page_Rank',
		axis='columns', inplace=True)
		df.drop('Google_Index',
		axis='columns', inplace=True)
		df.drop('Links_pointing_to_page',
		axis='columns', inplace=True)
		df.drop('Statistical_report',
		axis='columns', inplace=True)
		k=df['Result']
		l=[]
		for i in k:
			l.append(i)
		df1=df
		df1.drop('Result',
		axis='columns', inplace=True)

		self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(df1, l, test_size=0.2)

