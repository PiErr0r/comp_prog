from itertools import product

L = input().split()
L = ''.join(L)
n = int(input())

L = [L] * n
res = product(*L)

for r in res:
    print(''.join(r))
