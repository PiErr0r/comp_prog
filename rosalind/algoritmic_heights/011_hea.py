from collections import defaultdict as DD

def ints(arr):
    return list(map(int, arr.split(' ')))

def strs(arr):
    return list(map(str, arr))

def from_data(data):
    return data.split('\n')

def inline(*data):
    print(*data, end=" ")

def disp(data):
    print(" ".join(strs(data)))

with open('011_hea') as __f:
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
        if A[j] > A[i]: return
        swap(A, i, j)
        i = j

for i in A:
    B.append(i)
    bubble(B)

disp(B)
