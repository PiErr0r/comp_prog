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

with open('018_dag') as __f:
    data = __f.read().strip()

def bfs(G, n):
    q = []
    q.append(n)
    v = set()
    while q:
        node = q.pop(0)
        if node == n and len(v) != 0:
            return True
        if node in v:
            continue
        v.add(node)
        for child in G[node]:
            q.append(child)
    return False

[n, *Gs] = from_data(data, '\n\n')
n = int(n)

for G in Gs:
    [v, e, G] = to_graph(G, False)
    found = False
    for node in range(1, v + 1):
        if bfs(G, node):
            inline(-1)
            found = True
            break
    if not found:
        inline(1)

print()
