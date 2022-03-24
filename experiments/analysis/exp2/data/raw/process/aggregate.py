import pandas as pd
import sys
import re
import os
import glob

real_path = os.path.dirname(os.path.realpath(__file__))


def aggregate_main(file):
	## takes in string file name
	## returns list of dicts for each trial

	d = eval(open(file, 'r').read())
	trial_struct = d['trialStruct']
	del d['trialStruct']

	out = []

	for trial in trial_struct:
		out.append({**d, **trial})


	return out




if __name__ == '__main__':

	files = glob.glob(real_path + '/../*.txt')

	main = []
	demo = []

	for file in files:
		if 'main' in file:
			main += aggregate_main(file)
		else:
			demo.append(eval(open(file, 'r').read()))

	exp_number = re.search(r'exp(\d.?)\/', real_path).group(1)

	pd.DataFrame(main).to_csv(real_path + '/../../exp' + exp_number + '_main_raw.csv', index = False)
	pd.DataFrame(demo).to_csv(real_path + '/../../exp' + exp_number + '_demo.csv', index = False)
