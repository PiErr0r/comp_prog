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

def get_edges(G):
    E = []
    for u in G.keys():
        for v, w in G[u]:
            E.append((u, v, w))
    return E

INF = float('inf')
def bellman_ford(G, V, source):
    dist = [INF for i in range(V + 1)]
    prev = [None for i in range(V + 1)]
    E = get_edges(G)
    dist[source] = 0
    # find shortest paths from single source
    update = True
    for i in range(1, V):
        if not update: break
        update = False
        for u, v, w in E:
            #print(u, v, w, dist[u] + w, dist[v], dist[u] + w < dist[v])
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                prev[v] = u
                update = True

    # check for negative cycle
    #for i in range(1, V):
    for u, v, w in E:
        if dist[u] + w < dist[v]:
            return -1
    return dist

def get_indeg(G, v):
    indeg = [0 for i in range(v + 1)]
    for k in G.keys():
        for c, w in G[k]:
            indeg[c] += 1
    return indeg

with open('030_nwc') as __f:
    data = __f.read().strip()

[n, *Gs] = from_data(data, '\n\n')

for G in Gs:
    [v, e, G] = to_graph_weighted(G, False)
    vis = set()
    for i in range(1, v + 1):
        if i in vis: continue
        res = bellman_ford(G, v, i)
        if res == -1: break
        for i in range(1, v+1):
            if res[i] != INF:
                vis.add(i)
    if res == -1:   inline(1)
    else:           inline(-1)
print()
