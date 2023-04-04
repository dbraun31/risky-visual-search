#!/bin/python


import cgi, os, sys
sys.stderr = sys.stdout

try:
  fs = cgi.FieldStorage()

  path = '../gaita/experiments/production/exp3/main/'
  
  f = open(path + 'condition_code.txt', 'w')
  f.write(str(fs['data'].value))
  f.close()

  

  print("Status: 200 OK")
  print("Content-type: text/plain")
  print()


except Exception as e:
  ## tell jquery something went wrong
  print("Status: 400 Bad Request")
  print("Content-type: text/plain")
  print()
  print(str(e))