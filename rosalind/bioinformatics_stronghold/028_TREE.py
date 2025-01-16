from collections import defaultdict as DD

def dfs(i, M, S):
    if i in S: return
    S.add(i)
    for j in M[i]:
        dfs(j, M, S)

with open('028_tree.txt') as f:
    data = f.read();
    data = data.split('\n')
    N = int(data[0])
    E = [list(map(int, e.split(' '))) for e in data[1:-1]]

M = DD(list)
for e in E:
    a, b = e
    M[a].append(b)
    M[b].append(a)

S = set()
res = 0
for i in range(1, N + 1):
    if i in S:
        continue
    res += 1
    dfs(i, M, S)

print(res-1)
