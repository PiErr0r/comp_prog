from math import log, ceil, floor

print(log(228, 10))

with open('p099_base_exp.txt', 'r') as f:
    data = f.read()

data = data.split('\n')

maxi = 0
arr = []
cnt = 1
ln = None
for nums in data:
    a, b = map(int, nums.split(','))
    calc = b * log(a, 10)
    if calc > maxi:
        maxi = calc
        arr = [(a, b)]
        ln = cnt
    elif calc == maxi:
        arr.append((a,b))
    cnt += 1

print(maxi)
print(arr)
print(ln)
