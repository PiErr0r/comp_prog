from math import sqrt

T = int(input())


primes = [2]
for i in range(T):
	[N, L] = list(map(int, input().split()))
	cypher = list(map(int, input().split()))
	c_min = min(cypher)
	c_ind = cypher.index(c_min)
	c_primes = []
	less = more = False

	for prime in primes:

		if c_min % prime == 0:
			c_primes += [prime]

			if c_ind > 0 and cypher[c_ind - 1] % prime == 0:
				c_primes = [ cypher[c_ind - 1] / prime ] + c_primes
				c_primes += [c_min / prime] if c_ind != len(cypher) - 1 else []
				less = True
			else:
				c_primes += [ cypher[c_ind + 1] / prime ]
				if c_ind != 0:
					c_primes = [c_min / prime] + c_primes
				more = True
			break

		else:
			if primes[-1] > N:
				continue
			if j == len(primes) - 1:
				curr = primes[-1] + 1
				while True:
					is_prime = True
					for k in primes:
						if k > sqrt(curr):
							break

						if curr % k == 0:
							is_prime = False
							break

					if is_prime:
						primes += [curr]
						break
					curr += 1

	if c_ind > 0:
		for j in range(c_ind - 1, -1, -1):
			if less:
				less = False
				continue
			c_primes = [ cypher[j] / c_primes[0] ] + c_primes
	if c_ind < len(cypher) - 1:
		for j in range(c_ind + 1, len(cypher)):
			if more:
				more = False
				continue
			c_primes += [ cypher[j] / c_primes[-1] ]

	c_primes_unique = sorted(list(set(c_primes)))
	msg = ''

	for c_p in c_primes:
		msg += chr( ord('A') + c_primes_unique.index(c_p) )

	print('Case #{0}: {1}'.format(i + 1, msg))
