from collections import defaultdict as DD

def ints(arr):
    return list(map(int, arr.split(' ')))

def strs(arr):
    return list(map(str, arr))

def from_data(data, delim='\n'):
    return data.split(delim)

def to_graph_weighted(data, undirected = True):
    [dd, *E] = from_data(data)
    [v, e] = ints(dd)

    G = DD(list)
    for r in E:
        [a, b, w] = ints(r)
        G[a].append((b, w))
        if undirected:
            G[b].append((a, w))
    return [v, e, G]

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

def shortest_cycle(G, fr, to):
    q = [(fr, to, 0)]
    vis = {}
    mn = 1e9+7
    while q:
        if len(q) % 10000 == 0:
            print(len(q))
        u, v, l = q.pop(0)
        if l and u == fr and v == to:
            mn = min(mn, l)
            continue
        if l >= mn: continue
        if (u, v) in vis and vis[(u, v)] <= l: continue
        vis[(u, v)] = l
        for c, w in G[v]:
            q.append((v, c, l + w))
    return -1 if mn == 1e9+7 else mn

with open('026_cte') as __f:
    data = __f.read().strip()

[n, *Gs] = from_data(data, '\n\n')

for G in Gs:
    [V, e, G] = to_graph_weighted(G, False)
    u = list(G.keys())[0]
    v, w = G[u][0]
    inline(shortest_cycle(G, u, v))
print()
