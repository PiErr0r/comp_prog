cnt = 0

base = 1
exp = 1

curr = 1
i = 0
# brute force said there is no bigger number than 200 for this task
while i < 200:
	n = base ** exp
	l = len(str(n))
	if l == curr:
		cnt += 1
	elif l > curr:
		base = 1
		exp += 1
		curr += 1 
		continue
	i += 1
	base += 1

print(cnt)