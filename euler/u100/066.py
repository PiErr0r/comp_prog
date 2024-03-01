from math import sqrt

def ext_gcd(a, b):
    os, s = 0, 1
    ot, t = 1, 0
    while b:
        q = a // b
        a, b = b, a - q * b
        os, s = s, os - q * s
        ot, t = t, ot - q * t
    return a, os, s, ot, t


def solve(D):
	x = 1
	while True:
		# print(x)
		yy = (x * x - 1) / D
		if yy % 1:
			x += 1
			continue
		y = sqrt(yy)
		if y == 0 or y % 1:
			x += 1
			continue
		# print(x, x*x, y, x*x - D*y*y)
		return x 
	return -1

def is_square(D):
	return not (sqrt(D) % 1)

mx = 0
mxd = None

print(ext_gcd(1, 61))

exit(0)

for D in range(1000, 1, -1):
	if is_square(D): continue
	print(f"Try: {D}")
	res = solve(D)
	if res > mx:
		mx = res
		mxD = D
	print(f"max x = {mx} D = {mxD}")

print(mx, D)