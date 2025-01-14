from collections import defaultdict as DD

def ints(arr):
    return list(map(int, arr.split(' ')))

def strs(arr):
    return list(map(str, arr))

def from_data(data, delim='\n'):
    return data.split(delim)

def to_graph(data, undirected = True):
    [dd, *E] = from_data(data)
    [v, e] = ints(dd)

    G = DD(list)
    for r in E:
        [a, b] = ints(r)
        G[a].append(b)
        if undirected:
            G[b].append(a)
    return [v, e, G]

def inline(*data):
    print(*data, end=" ")

def disp(data):
    print(" ".join(strs(data)))

with open('024_ts') as __f:
    data = __f.read().strip()

[v, e, G] = to_graph(data, False)

T = []

while len(T) < v:
    V = set(range(1, v + 1))
    Ts = set(T)
    V -= Ts
    for k in G.keys():
        if k in Ts: continue
        for c in G[k]:
            if c in V:
                V.remove(c)
    start = list(V)[0]
    T.append(start)
    inline(start)

print()
