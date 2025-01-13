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

with open('017_hs') as __f:
    data = __f.read().strip()

[n, A] = from_data(data)
A = ints(A)
B = []

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
        if A[j] <= A[i]: return
        swap(A, i, j)
        i = j

def sift(A):
    i = 0
    while i < len(A):
        n = A[i]
        smi = i
        if L(i) < len(A) and A[L(i)] < n:
            n = A[L(i)]
            smi = L(i)
        if R(i) < len(A) and A[R(i)] < n:
            n = A[R(i)]
            smi = R(i)
        if i != smi:
            swap(A, i, smi)
            i = smi
        else:
            break

for i in A:
    B.append(i)
    bubble(B)

while B:
    n = B[0]
    inline(n)
    B[0] = B[len(B) - 1]
    B.pop()
    sift(B)
print()


