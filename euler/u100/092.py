def sum_sq_n(n):
	res = 0
	while n > 0:
		tmp = n % 10
		res += tmp * tmp
		n //= 10
	return res

def get_final(n):
	while n != 1 and n != 89:
		n = sum_sq_n(n)
	return n == 89

max_n = 10 ** 7
cnt = 0
for i in range(2, max_n + 1):
	if i % 100000 == 0:
		print(cnt)
	if get_final(i):
		cnt += 1

print(cnt)