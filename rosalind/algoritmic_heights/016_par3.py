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

with open('016_par3') as __f:
    data = __f.read().strip()

[n, A] = from_data(data)
n = int(n)
A = ints(A)

def swap(A, i, j):
    tmp = A[i]
    A[i] = A[j]
    A[j] = tmp

def partition(A):
    q = 0
    L = 0
    for i in range(1, len(A)):
        if A[i] < A[q]:
            swap(A, i, q+1)
            swap(A, q-L, q+1)
            q += 1
        elif A[i] == A[q]:
            swap(A, i, q+1)
            q += 1
            L += 1
    return A

print(" ".join(strs(partition(A))))

