
def all_odd(n):
	while n > 0:
		if not n & 1:
			return False
		n //= 10
	return True

def is_rev(n):
	a = n
	b = 0
	while n > 0:
		b = 10 * b + n % 10
		n //= 10
	return all_odd(a + b)

maxi = 1000000000
# maxi = 5000000
cnt = 0
t = 10
prev_cnt = 0
for i in range(10, maxi + 1):
	if i % 1000000 == 0:
		if prev_cnt:
			print(cnt / prev_cnt)
		prev_cnt = cnt
		print(i, cnt)
	if i == t * 10:
		t *= 10

	if (i // t & 1) != (i & 1) and i % 10 and is_rev(i):
		# print(bin(i))
		# print("##################")
		cnt += 1
print(cnt)
# solution = 608720 would never had ended in python