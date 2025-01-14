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

with open('022_med') as __f:
    data = __f.read().strip()

[n, A, k] = from_data(data)

def swap(A, i, j):
    tmp = A[i]
    A[i] = A[j]
    A[j] = tmp

def partition(A, lo, hi, k):
    q = lo
    L = 0
    for i in range(lo + 1, hi):
        if A[i] < A[q]:
            swap(A, i, q+1)
            swap(A, q-L, q+1)
            q += 1
        elif A[i] == A[q]:
            swap(A, i, q+1)
            q += 1
            L += 1
    if k == q:
        return A[q]
    elif k < q:
        return partition(A, lo, q, k)
    else:
        return partition(A, q+1, hi, k)

n = int(n)
A = ints(A)
k = int(k)

print(partition(A, 0, len(A), k - 1))




