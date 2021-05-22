from math import log10, floor

def get_next(p, q):
	tmp_p = p
	tmp_q = q
	p, q = tmp_p + 2*tmp_q, tmp_p + tmp_q
	return (p, q, floor(log10(p)) == floor(log10(q)))

cnt = 0
p = q = 1

for i in range(1000):
	p, q, bl = get_next(p, q)
	if not bl:
		cnt += 1

print(cnt)