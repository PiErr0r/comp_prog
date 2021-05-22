with open('p067_triangle.txt', 'r') as f:
	i_data = f.read()

i_data = [r.split() for r in i_data.split('\n')]
l = len(i_data[-1])

data = []
for r in i_data:
	nr = list(map(int, r))
	nr += [0] * (l - len(nr))
	data.append(nr)


for i in range(1, l):
	for j in range(l):
		data[i][j] += max(data[i-1][j], 0 if j == 0 else data[i-1][j - 1])

print(max(data[-1]))