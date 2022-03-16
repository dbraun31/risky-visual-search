import sys
import pandas as pd
import json

negative_key = [
	[51, 'gamblea-outcome1', 'gambleb-outcome1'],
	[52, 'gamblea-outcome1', 'gambleb-outcome2'],
	[53, 'gamblea-outcome1', 'gambleb-outcome1'],
	[54, 'gamblea-outcome1', 'gambleb-outcome2'],
	[55, 'gamblea-outcome2', 'gambleb-outcome2'],
	[56, 'gamblea-outcome1', 'gambleb-outcome1'],
	[57, 'gamblea-outcome1', 'gambleb-outcome2'],
	[58, 'gamblea-outcome1', 'gambleb-outcome1'],
	[59, 'gamblea-outcome1', 'gambleb-outcome2'],
	[60, 'gamblea-outcome1', 'gambleb-outcome2'],
	[61, 'gamblea-outcome1', 'gambleb-outcome2'],
	[62, 'gamblea-outcome2', 'gambleb-outcome2'],
	[63, 'gamblea-outcome1', 'gambleb-outcome2'],
	[64, 'gamblea-outcome2', 'gambleb-outcome2'],
	[65, 'gamblea-outcome2', 'gambleb-outcome2'],
	[66, 'gamblea-outcome2', 'gambleb-outcome1'],
	[67, 'gamblea-outcome1', 'gambleb-outcome1'],
	[68, 'gamblea-outcome1', 'gambleb-outcome1'],
	[69, 'gamblea-outcome1', 'gambleb-outcome1'],
	[70, 'gamblea-outcome1', 'gambleb-outcome1'],
	[71, 'gamblea-outcome1', 'gambleb-outcome1'],
	[72, 'gamblea-outcome2', 'gambleb-outcome1'],
	[73, 'gamblea-outcome1', 'gambleb-outcome2'],
	[74, 'gamblea-outcome1', 'gambleb-outcome1'],
	[75, 'gamblea-outcome2', 'gambleb-outcome1'],
	[76, 'gamblea-outcome1'],
	[77, 'gamblea-outcome1'],
	[78, 'gamblea-outcome1'],
	[79, 'gamblea-outcome1'],
	[80, 'gamblea-outcome1'],
	[81, 'gamblea-outcome1']
]


def parse_one_gamble(g):
	## parse gamble of the form: '24, .34; 59, .66'
	out = [x.replace(',', '').replace(';', '') for x in g.split(' ')]
	out = [float(x) if '.' in x else int(x) for x in out]
	return {'outcome1': out[0], 'probability1': out[1], 'outcome2': out[2], 'probability2': out[3]}



def parse_gambles(e):
	## input one row with keys: Gamble, Gamble A, Gamble B
	out = {}
	for gamble in ['Gamble A', 'Gamble B']:
		out[gamble.replace(' ', '').lower()] = parse_one_gamble(e[gamble])
	return out


def assign_negatives(index, gambles, negative_key):
	## gets input index, which is row number
	## gambles is {'gamblea': {'outcome1': int, 'probability1': float, ...}}
	out = {'gamblea': {}, 'gambleb': {}}

	## if all outcomes are negative
	if index > 25 and index < 51:
		for gamble in ['gamblea', 'gambleb']:
			for slot in gambles[gamble]:
				modifier = 1 if slot not in ['outcome1', 'outcome2'] else -1
				out[gamble][slot] = gambles[gamble][slot] * modifier
		return out

	## special cases
	if index > 50 and index < 82:
		for gamble in ['gamblea', 'gambleb']:
			target_row = [x for x in negative_key if x[0] == index][0]
			to_modify = 0
			for e in target_row[1:]:
				if gamble in e:
					to_modify = e.split('-')[1]

			for slot in gambles[gamble]:
				modifier = 1 if slot != to_modify else -1
				out[gamble][slot] = gambles[gamble][slot] * modifier

		return out


	return gambles



def to_df(d):
	out = []

	for row in d:
		row_build = {}
		row_build['index'] = row
		for gamble in d[row]:
			for slot in d[row][gamble]:
				row_build['{}_{}'.format(gamble, slot)] = d[row][gamble][slot]
		out.append(row_build)
	
	return pd.DataFrame(out)



def to_json(df):
	d = df.to_dict('records')

	out = []

	for row in d:
		new_row = {'gamblea': {}, 'gambleb': {}}
		for e in row:
			if e == 'index':
				continue

			gamble, slot = e.split('_')

			new_row[gamble][slot] = row[e]

		out.append(new_row)
	
	json_string = json.dumps(out)

	with open('gambles.json', 'w') as outfile:
		json.dump(json_string, outfile)



if __name__ == '__main__':

	file = sys.argv[1]
	if not file:
		print('Point to gambles.csv')
		sys.exit(1)

	og = pd.read_csv(file).to_dict('records')
	step2 = {}

	for e in og:
		step2[e['Gamble']] = parse_gambles(e)

	d = {}
	for index in step2:
		d[index] = assign_negatives(index, step2[index], negative_key = negative_key)

	df = to_df(d)
	df.to_csv('gambles_formatted.csv', index = False)
	#d = to_json(df)



