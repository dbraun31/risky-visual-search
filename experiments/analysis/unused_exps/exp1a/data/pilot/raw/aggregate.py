import pandas as pd
import sys



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
	args = sys.argv[1:]

	if not args:
		print('Usage: all_data.txt')
		sys.exit(1)


	main = []
	demo = []

	for file in args:
		if 'main' in file:
			main += aggregate_main(file)
		else:
			demo.append(eval(open(file, 'r').read()))

	pd.DataFrame(main).to_csv('../exp1_main.csv', index = False)
	pd.DataFrame(demo).to_csv('../exp1_demo.csv', index = False)
