from functools import cmp_to_key
from itertools import combinations_with_replacement as combinations
from itertools import permutations as perms

chars = input().split(' ')
M = {}
for (i, c) in enumerate(chars):
    M[c] = i
n = int(input())

S = set()
for c in combinations(chars, n):
    for i in range(1, n + 1):
        for p in perms(c, i):
            S.add(''.join(p))

S = sorted(list(S), key=lambda s: [M[c] for c in s])
print('\n'.join(S))
