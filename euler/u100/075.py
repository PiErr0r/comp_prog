'''
t turns out that

is the smallest length of wire that can be bent to form an integer sided right angle triangle in exactly one way, but there are many more examples.

: : : : : : In contrast, some lengths of wire, like , cannot be bent to form an integer sided right angle triangle, and other lengths allow more than one solution to be found; for example, using

it is possible to form exactly three different integer sided right angle triangles.

: , , Given that is the length of the wire, for how many values of can exactly one integer sided right angle triangle be formed?
'''


def gcd(a, b):
    while b:
        a, b = b, a % b
    return a


def gen_triplet(r, s):
	return (r*r - s*s, 2*r*s, r*r + s*s)

L = 1500000
s = 1
sums = {}
c1 = 0
while True:
	r = s + 1
	not_one = True
	if s % 1000 == 0:
		print(f"Try s={s}")
	c2 = 0
	while True:
		if (r+s) % 2 == 1 and gcd(r, s) == 1:
			a, b, c = gen_triplet(r, s)
			mult = 1
			sm = sum([a, b, c])
			while mult * sm < L:
				nn = mult * sm
				if nn in sums:  sums[nn] += 1
				else: 			sums[nn] = 1
				mult += 1

			if sm > L:
				# print(c2)
				c2 += 1
				r += 1
				# continue
			if c2 > 1000:
				# print("DONE", a, b, c)
				break
			elif sm > L:
				continue
			not_one = False
		r += 1
	if not_one:
		c1 += 1
		print("HERE", c1)
		# 261249
		# 262349
	if c1 > 1000:
		break
	s += 1

print(sums)

cnt = 0
for k in sums:
	if sums[k] == 1:
		cnt += 1

print(cnt)