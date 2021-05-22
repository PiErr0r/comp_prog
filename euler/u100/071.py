from lib import gcd

max_n = 1000000

goal = 3.0 / 7.0
fracs = set()
for i in range(1, max_n + 1):
	if i % 100000 == 0:
		print(i, len(fracs))
	for j in range(int(goal * i - 5), int(goal * i + 5)):
		if j <= 0 or j >= max_n:continue
		g = gcd(j, i)
		fracs |= {(j / g, i / g)}


fracs = sorted(list(fracs), key=lambda x: x[0] / x[1])
for i in range(len(fracs)):
	if i % 100000 == 0:
		print(i)
	if fracs[i][0] == 3 and fracs[i][1] == 7:
		print(fracs[i])
		print(fracs[i - 1])
		break