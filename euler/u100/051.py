"""
By replacing the 1st digit of the 2-digit number *3, it turns out that six of the nine possible 
values: 13, 23, 43, 53, 73, and 83, are all prime.
By replacing the 3rd and 4th digits of 56**3 with the same digit, this 5-digit number is the first 
example having seven primes among the ten generated numbers, yielding the family: 
56003, 56113, 56333, 56443, 56663, 56773, and 56993. Consequently 56003, being the first member 
of this family, is the smallest prime with this property.
Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) 
with the same digit, is part of an eight prime value family.
"""

from itertools import combinations

def get_primes(n):
	primes = [2, 3, 5, 7, 11, 13, 17, 19, 23]
	for i in range(24, n):
		if is_prime(i, primes):
			primes.append(i)
	return primes

def is_prime(n, primes):
	if n < 2:
		return False
	for i in primes:
		if i*i > n:
			break
		if n % i == 0:
			return False
	return True

def get_list_n(n):
	l = []
	while n:
		l.append(n % 10)
		n //= 10
	return list(reversed(l))

def get_num_list(l):
	res = 0
	for i in l:
		res = res * 10 + i
	return res

def has_repeating(n):
	l = get_list_n(n)
	res = {}
	for i in range(10):
		if l.count(i) > 1:
			res[i] = []
			for j in range(len(l)):
				if i == l[j]:
					res[i].append(j)
	return res

P = get_primes(20_000)

goal = 8
# i = 10_000_000
i = 50_000
inc = 1_000_000
T = i + inc
found = False
ps = set()

while not found:
	i += 1
	if i == T:
		print(i)
		T += inc
	if is_prime(i, P):
		r = has_repeating(i)
		keys = r.keys()
		if len(keys) == 0:
			continue
		l = get_list_n(i)
		for k in keys:
			ps = set()
			for j in range(10):
				for pos in r[k]:
					l[pos] = j
				if l[0] == 0: continue
				num = get_num_list(l)
				# if i == 56003:
				# 	print(ps, num)
				if is_prime(num, P):
					ps |= {num}
			if len(ps) == goal:
				found = True
			break

print(min(ps))
print(ps)
print([is_prime(i, P) for i in ps])

digits = 2
found = True
goal = 8
# ps = []
# this was a bad brute force attempt, for some reason it doesnt work for goal == 8
while not found:
	print("@",digits)
	l = [i for i in range(digits)]
	for r in range(1, len(l)):
		if found: break
		combs = list(combinations(l, r))
		for c in combs:
			if found: break
			for i in range(10**(digits - r - 1), 10**(digits - r)):
				if found: break
				ps = set()
				current = str(i)
				# print(i, c)
				for j in range(10):
					ns = ""
					cp = 0
					for d in c:
						if d == len(ns):
							ns += str(j)
						else:
							ns += current[cp:d] + str(j)
							cp = d
					if len(ns) < digits:
						ns += current[cp:]
					# print(ns)
					# if i == 563:
					# 	print(ns, c, ps)
					if ns[0] == '0':
						continue
					ns = int(ns)
					if is_prime(ns, P):
						ps |= {ns}
				found = len(ps) == goal
				# print(found, ps)
				if found: break
	digits += 1

print("RESULT:", min(ps))

