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
        [a, b, w] = ints(r)
        G[a].append((b, w))
        if undirected:
            G[b].append((a, w))
    return [v, e, G]

def inline(*data):
    print(*data, end=" ")

def disp(data):
    print(" ".join(strs(data)))

L = lambda k: 2 * k + 1
R = lambda k: 2 * k + 2
P = lambda k: (k + 1) // 2 - 1

def swap(A, i, j):
    tmp = A[i]
    A[i] = A[j]
    A[j] = tmp

def bubble(A):
    i = len(A) - 1
    while i != 0:
        j = P(i)
        if A[j][1] <= A[i][1]: return
        swap(A, i, j)
        i = j

def sift(A):
    i = 0
    while i < len(A):
        n = A[i][1]
        smi = i
        if L(i) < len(A) and A[L(i)][1] < n:
            n = A[L(i)][1]
            smi = L(i)
        if R(i) < len(A) and A[R(i)][1] < n:
            n = A[R(i)][1]
            smi = R(i)
        if i != smi:
            swap(A, i, smi)
            i = smi
        else:
            break

def hpush(H, item):
    H.append(item)
    bubble(H)

def hpop(H):
    item = H[0]
    H[0] = H[len(H) - 1]
    H.pop()
    sift(H)
    return item

def dijkstra(G, fnode, D):
    q = []
    hpush(q, (fnode, 0))
    while q:
        n, W = hpop(q)
        if W >= D[n]: continue
        D[n] = W
        for c, w in G[n]:
            hpush(q, (c, W + w))

with open('021_dij') as __f:
    data = __f.read().strip()

[v, e, G] = to_graph(data, False)

D = [1e9 + 7 for i in range(v + 1)]

dijkstra(G, 1, D)

for i, x in enumerate(D):
    if x == 1e9 + 7:
        D[i] = -1

disp(D[1:])
