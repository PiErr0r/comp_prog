from math import sqrt

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


def mul(p):
	return (1.0 - 1.0/p)

def get_phi(n, primes):
	res = n
	for i in primes:
		if i * i > n: break
		if n % i == 0:
			while n % i == 0:
				n /= i
			# res *= mul(i)
			res -= res / i
	if n > 1:
		# res *= mul(n)
		res -= res / n
	return int(res) if res != n else n - 1

def get_tot(n):
	result = n
	p = 2
	while(p * p <= n):           
		if (n % p == 0):  
			while (n % p == 0): 
				n = int(n / p); 
				result -= int(result / p); 
		p += 1; 
	if (n > 1): 
		result -= int(result / n); 
	return result; 

def gcd(a, b):
	while b:
		a, b = b, a % b
	return a

def is_int(n):
	return n == n // 1
