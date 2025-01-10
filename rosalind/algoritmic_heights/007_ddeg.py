from collections import defaultdict as DD

def ints(arr):
    return list(map(int, arr.split(' ')))

def from_data(data):
    return data.split('\n')

with open('007_ddeg') as __f:
    data = __f.read().strip()

G = DD(list)

[dd, *E] = from_data(data)
[v, e] = ints(dd)

for r in E:
    [a, b] = ints(r)
    G[a].append(b)
    G[b].append(a)

for k in range(1, v + 1):
    S = 0
    for child in G[k]:
        S += len(G[child])
    print(S, end=" ")

