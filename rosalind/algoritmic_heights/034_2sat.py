from collections import defaultdict as DD
import sys
sys.setrecursionlimit(10000)

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
def to_graph(data):
    [dd, *E] = from_data(data)
    [v, e] = ints(dd)

    G = DD(list)
    for r in E:
        [a, b] = ints(r)
        G[a].append(-b)
        G[b].append(-a)
    return [2 * v, 2 * e, G]

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

def outdeg(G, S):
    out = 0
    for node in S:
        for c in G[node]:
            if c in S: continue
            out += 1
    return out

def indeg(G, S):
    ind = 0
    for k in G.keys():
        if k in S: continue
        for c in G[k]:
            if c in S:
                ind += 1
    return ind

with open('034_2sat') as __f:
    data = __f.read().strip()


[n, *Gs] = from_data(data, '\n\n')

for G in Gs:
    [v, e, G] = to_graph(G)

    Gr = g_reversed(G)

    S = []
    V = set()
    for i in range(1, v // 2 + 1):
        if i not in V:
            dfs(G, i, V, S)
        if -i not in V:
            dfs(G, -i, V, S)

    V = set()

    CC = []
    while S:
        node = S.pop()
        if node in V:
            continue
        W = V.copy()
        V.add(node)
        dfs3(Gr, node, V)
        CC.append(V - W)
        # print(V-W, "IN:",indeg(G, V-W), "OUT:", outdeg(G, V-W), G)

    sat = True
    VV = set()
    res = []
    for cc in CC:
        for node in cc:
            if node not in VV:
                res.append(node)
                VV.add(node)
                VV.add(-node)
            if -node in cc:
                sat = False
                break
        if not sat:
            print(0)
            break

    if not sat:
        continue

    print(1, end=" ")
    res.sort(key=lambda x: abs(x))
    disp(res)
