from math import sqrt
from lib import get_tot, get_primes, get_phi

primes = get_primes(100)
r_goal = 15499/94744

i = 0
res = 1
while i < len(primes):
	res *= primes[i]
	if get_phi(res, primes) / (res - 1) <= r_goal:
		break
	i += 1

res /= primes[i]

res = int(res)

i = 2
while i < 100:
	if i in primes: 
		i += 1
		continue
	res *= i
	phi = get_phi(res, primes)
	if phi / (res - 1) <= r_goal:
		break
	i += 1

print(res)
print(get_phi(25, primes))