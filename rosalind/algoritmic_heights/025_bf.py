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

def bellman_ford(G, V, source):
    INF = float('inf')
    dist = [INF for i in range(V + 1)]
    prev = [None for i in range(V + 1)]
    E = get_edges(G)
    dist[source] = 0
    # find shortest paths from single source
    for i in range(1, V):
        for u, v, w in E:
            #print(u, v, w, dist[u] + w, dist[v], dist[u] + w < dist[v])
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                prev[v] = u

    # check for negative cycle
    for i in range(1, V):
        for u, v, w in E:
            if dist[u] + w < dist[v]:
                # negative cycle exists
                vis = set()
                vis.add(v)
                while u not in vis:
                    vis.add(u)
                    u = prev[u]
                ncycle = [u]
                v = prev[u]
                while v != u:
                    ncycle.append(v)
                    v = prev[v]
                ncycle.append(v)
                ncycle.reverse()
                raise Exception("Negative cycle found:", " -> ".join(strs(ncycle)))

    dist = ['x' if n == INF else int(n) for n in dist]
    return dist[1:]

with open('025_bf_tmp') as __f:
    data = __f.read().strip()

[v, e, G] = to_graph_weighted(data, False)

print(" ".join(strs(bellman_ford(G, v, 1))))
