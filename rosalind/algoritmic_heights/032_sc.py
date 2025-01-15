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

def outdeg(G, V, W):
    out = 0
    for node in V - W:
        for c in G[node]:
            if c in V - W: continue
            out += 1
    return out

def indeg(G, V, W):
    ind = 0
    for k in G.keys():
        if k in V - W: continue
        for c in G[k]:
            if c in V - W:
                ind += 1
    return ind

def g_reversed(G):
    Gr = DD(list)
    for k in G.keys():
        for c in G[k]:
            Gr[c].append(k)
    return Gr

with open('032_sc') as __f:
    data = __f.read().strip()

[n, *Gs] = from_data(data, '\n\n')

for G in Gs:
    [v, e, G] = to_graph(G, False)
    Gr = g_reversed(G)

    S = []
    V = set()
    for i in range(1, v + 1):
        if i in V: continue
        dfs(G, i, V, S)

    V = set()
    cnt = 0
    while S:
        node = S.pop()
        if node in V:
            continue
        W = V.copy()
        V.add(node)
        dfs3(Gr, node, V)

        out = outdeg(Gr, V, W)
        if out == 0:
            cnt += 1

    if cnt == 1:
        inline(1)
    else:
        inline(-1)

print()
