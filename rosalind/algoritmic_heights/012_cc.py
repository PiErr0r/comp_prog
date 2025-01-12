from collections import defaultdict as DD

def ints(arr):
    return list(map(int, arr.split(' ')))

def strs(arr):
    return list(map(str, arr))

def from_data(data):
    return data.split('\n')

def to_graph(data):
    [dd, *E] = from_data(data)
    [v, e] = ints(dd)

    G = DD(list)
    for r in E:
        [a, b] = ints(r)
        G[a].append(b)
        G[b].append(a)
    return [v, e, G]

def inline(*data):
    print(*data, end=" ")

def disp(data):
    print(" ".join(strs(data)))

with open('012_cc') as __f:
    data = __f.read().strip()


[v, e, G] = to_graph(data)
cnt = 0
visited = set()

def dfs(G, node, visited):
    if node in visited: return
    visited.add(node)
    for child in G[node]:
        dfs(G, child, visited)

for node in range(1, v + 1):
    if node in visited: continue
    dfs(G, node, visited)
    cnt += 1

print(cnt)
