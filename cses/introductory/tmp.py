from math import inf
n = int(input())

a = []
sums = []
suma = 0
a = list(map(int, input().split(' ')))
for i in a:
    sums.append(i)
    suma += i

for i in a:
    sz = len(sums)
    for j in range(sz):
        sums.append(sums[j] + i)

sums = set(sums)
mn = inf
print(len(sums))
for s in sums:
    tmp = abs(suma - s - s)
    if tmp < mn:
        print(suma - s, s, tmp)
        mn = tmp


print(mn)
