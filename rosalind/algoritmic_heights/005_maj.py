from collections import defaultdict as DD
from collections import Counter

def ints(arr):
    return list(map(int, arr.split(' ')))

def from_data(data):
    return data.split('\n')

def inline(*data):
    print(*data, end=" ")

with open('005_maj') as __f:
    data = __f.read().strip()

[nm, *As] = from_data(data)

for A in As:
    A = ints(A)
    cnt = Counter(A)
    found = False
    for k in cnt.keys():
        if cnt[k] > len(A) // 2:
            found = True
            inline(k)
            break
    if not found:
        inline(-1)

print()


