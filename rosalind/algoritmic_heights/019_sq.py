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

with open('019_sq') as __f:
    data = __f.read().strip()

def bfs(G, node):
    q = [(node,None, 0)]
    v ={}
    while q:
        n, fr, L = q.pop(0)
        if n in v:
            if v[n] + L == 4:
                return True
            continue
        if L > 4: continue
        v[n] = L
        for child in G[n]:
            if child == fr: continue
            q.append((child, n, L+1))
    return False

[n, *Gs] = from_data(data, '\n\n')

for G in Gs:
    [v, e, G] = to_graph(G)
    found = False
    for node in range(1, v + 1):
        if (bfs(G, node)):
            inline(1)
            found = True
            break
    if not found:
        inline(-1)

print()
