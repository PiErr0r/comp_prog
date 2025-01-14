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

with open('028_hdag') as __f:
    data = __f.read().strip()

[n, *Gs] = from_data(data, '\n\n')

for G in Gs:
    [v, e, G] = to_graph(G, False)
    indeg = [0 for i in range(v + 1)]
    for k in G.keys():
        for c in G[k]:
            indeg[c] += 1

    q = [i for i in range(v + 1) if indeg[i] == 0 and i != 0]

    res = []
    skip = False
    while q:
        if len(q) != 1:
            print(-1)
            skip = True
            break
        res.append(q[0])
        for _ in range(len(q)):
            node = q.pop(0)
            for c in G[node]:
                indeg[c] -= 1
                if indeg[c] == 0:
                    q.append(c)
    if not skip:
        inline(1)
        disp(res)


