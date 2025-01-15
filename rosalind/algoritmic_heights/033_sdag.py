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
    for c, w in G[node]:
        if c in V: continue
        dfs(G, c, V, S)
    S.append(node)

def toposort(G, v):
    S = []
    V = set()
    for k in range(1, v + 1):
        if k in V: continue
        dfs(G, k, V, S)
    return S

with open('033_sdag') as __f:
    data = __f.read().strip()

[v, e, G] = to_graph_weighted(data, False)

vs = toposort(G, v)
D = [float('inf') for _ in range(v + 1)]
D[1] = 0

while vs:
    node = vs.pop()
    if D[node] != float('inf'):
        for c, w in G[node]:
            D[c] = min(D[c], D[node] + w)
print(" ".join(strs([x if x != float('inf') else 'x' for x in D[1:]])))

