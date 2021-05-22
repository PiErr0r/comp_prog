from math import sqrt
from lib import get_primes

def is_prime(n, p):
	if n < 2:
		return False
	for i in p:
		if i > sqrt(n):
			break
		if n % i == 0:
			return False
	return True


def mul(p):
	return (1.0 - 1.0/p)

def get_tot(n, primes):
	res = n
	for i in primes:
		if i > (n / 2 + 1): break
		if n % i == 0:
			res *= mul(i)
	return int(res) if res != n else n - 1


max_n = 1000000
primes = get_primes(max_n)

primes = [2, 3, 5, 7, 11, 13, 17, 19, 23]
for i in range(24, max_n):
	if is_prime(i, primes):
		primes.append(i)

maxi = 0
n = None
for i in range(2, max_n + 1):
	if i % 10000 == 0:
		print(i)
	phi = get_tot(i, primes)
	if (r := i / phi) > maxi:
		maxi = r
		n = i

print(n, maxi)