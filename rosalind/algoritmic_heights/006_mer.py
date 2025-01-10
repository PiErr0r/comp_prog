from collections import defaultdict as DD

def ints(arr):
    return list(map(int, arr.split(' ')))

def strs(arr):
    return list(map(str, arr))

def from_data(data):
    return data.split('\n')

def inline(*data):
    print(*data, end=" ")

with open('006_mer') as __f:
    data = __f.read().strip()

def merge(A, B):
    res = []
    ia = 0
    ib = 0
    while ia < len(A) and ib < len(B):
        while ia < len(A) and A[ia] <= B[ib]:
            res.append(A[ia])
            ia += 1
        while ib < len(B) and B[ib] <= A[ia]:
            res.append(B[ib])
            ib += 1
    while ia < len(A):
        res.append(A[ia])
        ia += 1
    while ib < len(B):
        res.append(B[ib])
        ib += 1
    return res

[n, A, m, B] = from_data(data)
n = int(n)
m = int(m)
A = ints(A)
B = ints(B)

print(" ".join(strs(merge(A, B))))
