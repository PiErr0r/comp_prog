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

def g_reversed(G):
    Gr = DD(list)
    for k in G.keys():
        for c in G[k]:
            Gr[c].append(k)
    return Gr

def dfs(G, node, V):
    if node in V: return
    V.add(node)
    for c in G[node]:
        dfs(G, c, V)

def dfs(G, node, V, S):
    V.add(node)
    for c in G[node]:
        if c in V: continue
        dfs(G, c, V, S)
    S.append(node)

def dfs3(G, node, V):
    V.add(node)
    for c in G[node]:
        if c in V: continue
        dfs3(G, c, V)

with open('029_scc') as __f:
    data = __f.read().strip()

[v, e, G] = to_graph(data, False)
Gr = g_reversed(G)

S = []
V = set()
for i in range(1, v + 1):
    if i in V: continue
    dfs(G, i, V, S)

V = set()

cc = 0
while S:
    node = S.pop()
    if node in V:
        continue
    V.add(node)
    dfs3(Gr, node, V)
    cc += 1
print(cc)
