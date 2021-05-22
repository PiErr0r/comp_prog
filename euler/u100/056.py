"""


A googol (10100) is a massive number: one followed by one-hundred zeros; 100100 is almost unimaginably large: one followed by two-hundred zeros. Despite their size, the sum of the digits in each number is only 1.

Considering natural numbers of the form, ab, where a, b < 100, what is the maximum digital sum?

"""

def get_sum(i, j):
	tmp = i ** j
	ret = 0
	while tmp > 0:
		ret += tmp % 10
		tmp /= 10
	return ret

max_sum = 0
for i in range(1, 101):
	for j in range(1,101):
	 	tmp = get_sum(i, j)
	 	if tmp > max_sum: max_sum = tmp

print(max_sum)