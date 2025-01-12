from collections import defaultdict as DD

def ints(arr):
    return list(map(int, arr.split(' ')))

def strs(arr):
    return list(map(str, arr))

def from_data(data):
    return data.split('\n')

def inline(*data):
    print(*data, end=" ")

with open('010_par') as __f:
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
    for i in range(1, len(A)):
        if A[i] <= A[q]:
            swap(A, i, q+1)
            swap(A, q, q+1)
            q += 1
    return A

print(" ".join(strs(partition(A))))
