import pandas as pd
import sys
import re
import os
import glob

full_path = '/home/dave/Dropbox (Lehigh University)/post_doc/professional/practical_new_world/gaita/experiments/analysis/exp3/data/raw/'


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

	files = glob.glob(full_path + '*.txt')

	main = []
	demo = []

	for file in files:
		if 'main' in file:
			main += aggregate_main(file)
		else:
			demo.append(eval(open(file, 'r').read()))

	exp_number = re.search(r'exp(\d)', full_path).group(1)

	pd.DataFrame(main).to_csv(full_path + '/../exp' + exp_number + '_main_raw.csv', index = False)
	pd.DataFrame(demo).to_csv(full_path + '/../exp' + exp_number + '_demo.csv', index = False)
