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

with open('014_inv') as __f:
    data = __f.read().strip()

[n, A] = from_data(data)
n = int(n)
A = ints(A)

def merge(A, lo, mid, hi):
    B = []
    l = lo
    r = mid + 1
    cnt = 0

    while l <= mid and r <= hi:
        if A[l] <= A[r]:
            B.append(A[l])
            l += 1
        else:
            B.append(A[r])
            cnt += (mid - l + 1)
            r += 1
    while l <= mid:
        B.append(A[l])
        l += 1
    while r <= hi:
        B.append(A[r])
        r += 1
    for i in range(lo, hi + 1):
        A[i] = B[i - lo]

    return cnt

def msort(A, lo, hi):
    cnt = 0
    if lo >= hi: return cnt
    mid = lo + (hi - lo) // 2
    cnt += msort(A, lo, mid)
    cnt += msort(A, mid + 1, hi)
    cnt += merge(A, lo, mid, hi)
    return cnt

cnt = msort(A, 0, len(A) - 1)

print(cnt)

