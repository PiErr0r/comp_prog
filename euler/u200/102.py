def btw(a1, a, a2):
	return a1 < a < a2 or a2 < a < a1

def intersects(p1, p2):
	"""
	y1 ... y = x 
	m = (y2 - y1) / (x2 - x1)
	y2 ... y - y1 = m * (x - x1)
	x = mx - mx1 + y1
	x = (y1 - m*x1) / (1 - m)
	"""
	[x1, y1] = p1
	[x2, y2] = p2
	print(p1, p2)
	if x1 == x2:
		x = y = x1
		return 1 if btw(0, x, 1001) and btw(x1, x, x2) and btw(y1, y, y2) else 0
	m = (y2 - y1) / (x2 - x1)
	if m == 1:
		return 0
	y = x = (y1 - m*x1) / (1 - m)
	return 1 if btw(0, x, 1001) and btw(x1, x, x2) and btw(y1, y, y2) else 0


def has_origin(t):
	ints = 0
	for i in range(len(t) // 2):
		ints += intersects(t[2*i:2*i+2], t[2*((i + 1) % 3): 2*((i + 1) % 3) + 2])
		print(ints)

	return ints % 2 != 0


with open("p102_triangles.txt", "r") as f:
	data = f.read()

data = data.split()
cnt = 0
for triangle in data:
	t = list(map(float, triangle.split(",")))
	if has_origin(t):
		cnt += 1

print(cnt)

