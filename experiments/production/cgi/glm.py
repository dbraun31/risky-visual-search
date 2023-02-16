#!/bin/python

import cgi, os, sys
import numpy as np
from sklearn.linear_model import LogisticRegression as LR
sys.stderr = sys.stdout

try:
    fs = cgi.FieldStorage()

    d = np.array(eval(fs['data'].value))

    X = d[:,0].reshape(-1, 1)
    y = d[:,-1]

    lr = LR().fit(X, y)
    intercept = lr.intercept_[0]
    slope = lr.coef_[0][0]
    
    print('Status: 200 OK')
    print('Content-type: text/plain')
    print('')
    print(str([intercept, slope]))

except Exception as e:
	print("Status: 400 Bad Request")
	print("Content-type: text/plain")
	print()
	print(str(e))



