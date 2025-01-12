from collections import defaultdict as DD

def ints(arr):
    return list(map(int, arr.split(' ')))

def strs(arr):
    return list(map(str, arr))

def from_data(data):
    return data.split('\n')

def inline(*data):
    print(*data, end=" ")

with open('008_ms') as __f:
    data = __f.read().strip()

[n, arr] = from_data(data)
n = int(n)
arr = ints(arr)

def merge(A, B):
    res = []
    ia = 0
    ib = 0
    while ia < len(A) and ib < len(B):
        while ia < len(A) and A[ia] <= B[ib]:
            res.append(A[ia])
            ia += 1
        while ib < len(B) and (ia == len(A) or B[ib] <= A[ia]):
            res.append(B[ib])
            ib += 1
    while ia < len(A):
        res.append(A[ia])
        ia += 1
    while ib < len(B):
        res.append(B[ib])
        ib += 1
    return res

def msort(A):
    if len(A) <= 1: return A
    hf = len(A) // 2
    L = msort(A[:hf])
    R = msort(A[hf:])
    return merge(L, R)

print(" ".join(strs(msort(arr))))

