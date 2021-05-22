from math import sqrt, ceil

def is_prime(n):
	for i in range(2, ceil(sqrt(n))):
		if n % i == 0:
			return False
	return True

diag_cnt = 6
p_cnt = 4
inc = 4
i = 13
p = p_cnt / diag_cnt
inc_cnt = 0
while p > 0.1:
	print(p)
	if inc_cnt == 2:
		inc_cnt = 0
		inc += 1
	i += inc
	if is_prime(i):
		p_cnt += 1
	diag_cnt += 1
	p = p_cnt / diag_cnt
	inc_cnt += 1

print(inc_cnt, inc, i)
