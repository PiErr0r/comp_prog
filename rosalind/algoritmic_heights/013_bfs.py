from collections import defaultdict as DD

def ints(arr):
    return list(map(int, arr.split(' ')))

def strs(arr):
    return list(map(str, arr))

def from_data(data):
    return data.split('\n')

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

with open('013_bfs') as __f:
    data = __f.read().strip()

def bfs(G, node, A):
    q = []
    visited = set()
    q.append((node, 0))
    while q:
        n, s = q.pop(0)
        if n in visited: continue
        visited.add(n)

        A[n - 1] = s
        for child in G[n]:
            q.append((child, s + 1))

[v, e, G] = to_graph(data, False)

A = [-1 for i in range(v)]

bfs(G, 1, A)

disp(A)
