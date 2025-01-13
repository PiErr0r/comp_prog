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

with open('015_3sum') as __f:
    data = __f.read().strip()

[kn, *As] = from_data(data)
[k, n] = ints(kn)

for A in As:
    A = ints(A)
    A1 = {}
    for i, a in enumerate(A):
        if a in A1:
            continue
        A1[a] = i
    A2 = {}
    K = A1.keys()
    for k1 in K:
        for k2 in K:
            if k1 + k2 in A2:
                continue
            A2[k1+k2] = (A1[k1], A1[k2])
    found = False
    for k in K:
        if -k in A2:
            i, j = A2[-k]
            k = A1[k]
            mn = min(i, j, k)
            mx = max(i, j, k)
            md = i + j + k - mn - mx
            print(mn+1, md+1, mx+1)
            found = True
            break
    if not found:
        print(-1)


