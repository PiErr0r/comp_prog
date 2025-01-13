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

with open('020_bip') as __f:
    data = __f.read().strip()

def bfs(G, node):
    q = [(node, True)]
    v1 = set()
    v1.add(node)
    v2 = set()
    v = set()
    while q:
        n, curr = q.pop(0)
        if n in v:
            continue
        v.add(n)
        for c in G[n]:
            if curr:
                v2.add(c)
            else:
                v1.add(c)
            q.append((c, not curr))
    return v1, v2

[n, *Gs] = from_data(data, '\n\n')

for G in Gs:
    [v, e, G] = to_graph(G)
    found = False
    V1, V2 = bfs(G, 1)
    if V1 & V2:
        inline(-1)
    else:
        inline(1)

print()
