
def desc(n):
	a = n % 10
	n //= 10
	while n > 0:
		b = n % 10
		if a > b:
			return False
		a = b
		n //= 10
	return True

def inc(n):
	a = n % 10
	n //= 10
	while n > 0:
		b = n % 10
		if a < b:
			return False
		a = b
		n //= 10
	return True

i = 99
cnt = 0
prop = 0
while prop < 0.99:
	i += 1
	if not desc(i) and not inc(i):
		cnt += 1
	prop = cnt / i
	if i == 21780:

print(i)