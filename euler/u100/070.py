from lib import get_phi, get_primes

def is_perm(a, b):
	a = ''.join(list(sorted(list(str(a)))))
	b = ''.join(list(sorted(list(str(b)))))
	return a == b

primes = get_primes(1000000)
max_n = 10 ** 7

mini = max_n ** 2
n = None
for i in range(1, max_n + 1):
	if i % 10000 == 0:
		print(i)
	phi = get_phi(i, primes)
	if is_perm(phi, i):
		if i / phi < mini:
			mini = i / phi
			n = i
print(n)