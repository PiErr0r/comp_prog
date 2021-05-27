from math import inf
n = int(input())

a = []
sums = [0]
suma = 0
a = list(map(int, input().split(' ')))
for i in a:
    suma += i

for i in a:
    sz = len(sums)
    for j in range(sz):
        if sums[j] == i:
            continue
        sums.append(sums[j] + i)

sums = set(sums)
mn = inf
for s in sums:
    tmp = abs(suma - s - s)
    if tmp < mn:
        mn = tmp


print(mn)
