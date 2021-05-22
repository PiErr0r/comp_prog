# This should work but it doesn't and I can't find a good algorithm for partition calculation :(
# so Wolfram Alpha it is

def pk(n, k):
	if k == 0:
		return 0
	if n == 0:
		return 1
	if n < 0:
		return 0
	a = pk(n - k, k)
	b = pk(n - 1, k - 1)
	return a + b

def p(n):
	suma = 0
	for i in range(n):
		res = pk(n, i)
		suma += res
	return suma

print(p(100))