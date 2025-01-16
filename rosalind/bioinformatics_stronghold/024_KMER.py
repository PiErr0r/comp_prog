from itertools import product
from helpers import read_fasta

L = 'ACGT'
L = ''.join(L)
n = 4

L = [L] * n
res = product(*L)

[s] = read_fasta('list')
M = {}

for r in res:
    M[''.join(r)] = 0

for i in range(4, len(s) + 1):
    curr = s[i-4:i]
    M[curr] += 1

for k in M:
    print(M[k], end=' ')
print()
