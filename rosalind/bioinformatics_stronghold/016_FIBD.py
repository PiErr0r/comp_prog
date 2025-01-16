[n,m] = list(map(int, input().split()))

f = [1, 1]
d = 0
i = 2
while i < n:
	if i < m:
		c = f[i - 1] + f[i - 2]
	elif i == m:
		c = f[i - 1] + f[i - 2] - 1
	else:
		c = f[i - 1] + f[i - 2] - f[i - m - 1]
	f.append(c)
	i += 1

print(f)
print(f[-1])
